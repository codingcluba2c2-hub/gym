import { db } from './enterpriseStorage';
import type { User, MemberProfile, UserRole } from '../types/gymEnterprise';

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  profile?: MemberProfile;
}

// Rate limiting simulator for brute-force protection
const failedAttempts: Record<string, { count: number; lastAttempt: number }> = {};

export const authService = {
  // Public registration strictly creates MEMBER accounts
  register: (fullName: string, email: string, password: string, phone: string): AuthResponse => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password || !fullName.trim() || !phone.trim()) {
      return { success: false, message: 'All registration fields are required.' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    const users = db.getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const newUserId = `user-${Date.now()}`;
    const newProfileId = `prof-${Date.now()}`;
    const now = new Date().toISOString();

    const newUser: User = {
      id: newUserId,
      email: cleanEmail,
      passwordHash: password, // In production, bcrypt.hash()
      role: 'MEMBER', // STRICT: Public registration can NEVER create ADMIN or STAFF
      status: 'ACTIVE',
      createdAt: now,
      updatedAt: now,
    };

    const newProfile: MemberProfile = {
      id: newProfileId,
      userId: newUserId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      experienceLevel: 'Intermediate',
      createdAt: now,
      updatedAt: now,
    };

    users.push(newUser);
    db.saveUsers(users);

    const profiles = db.getProfiles();
    profiles.push(newProfile);
    db.saveProfiles(profiles);

    // Audit log
    db.logAction(
      'MEMBER_REGISTERED',
      { id: newUser.id, email: newUser.email },
      'USER',
      newUser.id,
      `New member registered: ${newProfile.fullName} (${newUser.email})`
    );

    // Set active session
    db.saveSession({ user: newUser, profile: newProfile });

    return { success: true, message: 'Registration successful! Welcome to Iron District.', user: newUser, profile: newProfile };
  },

  // Secure login with role routing and rate-limiting
  login: (email: string, password: string): AuthResponse => {
    const cleanEmail = email.trim().toLowerCase();
    const now = Date.now();

    // Check rate limiting (max 5 failed attempts in 5 minutes)
    const attempts = failedAttempts[cleanEmail];
    if (attempts && attempts.count >= 5 && now - attempts.lastAttempt < 5 * 60 * 1000) {
      return { success: false, message: 'Too many failed login attempts. Please wait 5 minutes before trying again.' };
    }

    const users = db.getUsers();
    const user = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user || user.passwordHash !== password) {
      // Record failed attempt
      failedAttempts[cleanEmail] = {
        count: (attempts?.count || 0) + 1,
        lastAttempt: now,
      };
      return { success: false, message: 'Invalid email address or password.' };
    }

    if (user.status === 'SUSPENDED') {
      return { success: false, message: 'This account has been suspended. Please contact gym administration.' };
    }

    // Reset rate limit on success
    delete failedAttempts[cleanEmail];

    const profiles = db.getProfiles();
    let profile = profiles.find((p) => p.userId === user.id);

    if (!profile) {
      // Fallback profile if missing
      profile = {
        id: `prof-${user.id}`,
        userId: user.id,
        fullName: user.email.split('@')[0],
        phone: '+1 (555) 000-0000',
        experienceLevel: 'Intermediate',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      profiles.push(profile);
      db.saveProfiles(profiles);
    }

    db.logAction(
      'USER_LOGIN',
      { id: user.id, email: user.email },
      'AUTH',
      user.id,
      `User logged in with role ${user.role}`
    );

    db.saveSession({ user, profile });

    return { success: true, message: `Welcome back, ${profile.fullName}!`, user, profile };
  },

  // Safe logout
  logout: () => {
    const session = db.getSession();
    if (session) {
      db.logAction(
        'USER_LOGOUT',
        { id: session.user.id, email: session.user.email },
        'AUTH',
        session.user.id,
        'User logged out of active session.'
      );
    }
    db.saveSession(null);
  },

  // Verify current authenticated session
  getCurrentSession: () => {
    return db.getSession();
  },

  // Update profile
  updateProfile: (fullName: string, phone: string, address?: string, emergencyContact?: string, experienceLevel?: MemberProfile['experienceLevel']): AuthResponse => {
    const session = db.getSession();
    if (!session) return { success: false, message: 'Unauthorized. Please sign in.' };

    const profiles = db.getProfiles();
    const idx = profiles.findIndex((p) => p.userId === session.user.id);
    if (idx === -1) return { success: false, message: 'Member profile not found.' };

    profiles[idx] = {
      ...profiles[idx],
      fullName: fullName.trim() || profiles[idx].fullName,
      phone: phone.trim() || profiles[idx].phone,
      address: address ?? profiles[idx].address,
      emergencyContact: emergencyContact ?? profiles[idx].emergencyContact,
      experienceLevel: experienceLevel ?? profiles[idx].experienceLevel,
      updatedAt: new Date().toISOString(),
    };

    db.saveProfiles(profiles);
    db.saveSession({ user: session.user, profile: profiles[idx] });

    db.logAction(
      'PROFILE_UPDATED',
      { id: session.user.id, email: session.user.email },
      'MEMBER_PROFILE',
      profiles[idx].id,
      'Updated personal profile information.'
    );

    return { success: true, message: 'Profile updated successfully.', profile: profiles[idx], user: session.user };
  },

  // Change password
  changePassword: (currentPass: string, newPass: string): AuthResponse => {
    const session = db.getSession();
    if (!session) return { success: false, message: 'Unauthorized. Please sign in.' };

    if (newPass.length < 6) return { success: false, message: 'New password must be at least 6 characters.' };

    const users = db.getUsers();
    const userIdx = users.findIndex((u) => u.id === session.user.id);
    if (userIdx === -1 || users[userIdx].passwordHash !== currentPass) {
      return { success: false, message: 'Current password is incorrect.' };
    }

    users[userIdx].passwordHash = newPass;
    users[userIdx].updatedAt = new Date().toISOString();
    db.saveUsers(users);

    db.logAction(
      'PASSWORD_CHANGED',
      { id: session.user.id, email: session.user.email },
      'USER',
      session.user.id,
      'Member changed account password.'
    );

    return { success: true, message: 'Password changed successfully.' };
  },

  // Admin: Assign roles securely
  assignRole: (adminUser: User, targetUserId: string, newRole: UserRole): AuthResponse => {
    if (adminUser.role !== 'ADMIN') {
      return { success: false, message: 'Forbidden. Only administrators can alter user permissions.' };
    }

    const users = db.getUsers();
    const targetIdx = users.findIndex((u) => u.id === targetUserId);
    if (targetIdx === -1) return { success: false, message: 'Target user does not exist.' };

    const oldRole = users[targetIdx].role;
    users[targetIdx].role = newRole;
    users[targetIdx].updatedAt = new Date().toISOString();
    db.saveUsers(users);

    db.logAction(
      'ROLE_ASSIGNED',
      { id: adminUser.id, email: adminUser.email },
      'USER',
      targetUserId,
      `Changed role of ${users[targetIdx].email} from ${oldRole} to ${newRole}`
    );

    return { success: true, message: `Role successfully updated to ${newRole}.` };
  },
};
