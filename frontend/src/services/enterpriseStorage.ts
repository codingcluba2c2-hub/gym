import type {
  User,
  MemberProfile,
  StoredMembershipPlan,
  MembershipRecord,
  PaymentRecord,
  AttendanceRecord,
  ClassBookingRecord,
  EnquiryRecord,
  AuditLogRecord,
  GymSettings,
} from '../types/gymEnterprise';

const STORAGE_KEYS = {
  USERS: 'iron_gym_users_v2',
  PROFILES: 'iron_gym_profiles_v2',
  PLANS: 'iron_gym_plans_v2',
  MEMBERSHIPS: 'iron_gym_memberships_v2',
  PAYMENTS: 'iron_gym_payments_v2',
  ATTENDANCE: 'iron_gym_attendance_v2',
  BOOKINGS: 'iron_gym_bookings_v2',
  ENQUIRIES: 'iron_gym_enquiries_v2',
  AUDIT: 'iron_gym_audit_v2',
  SETTINGS: 'iron_gym_settings_v2',
  SESSION: 'iron_gym_session_v2',
};

// Seed initial dataset if not yet in localStorage
export function initializeEnterpriseStorage() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const initialUsers: User[] = [
      {
        id: 'user-admin-1',
        email: 'admin@irondistrict.com',
        passwordHash: 'admin123', // Demo encrypted credential
        role: 'ADMIN',
        status: 'ACTIVE',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
      {
        id: 'user-staff-1',
        email: 'coach.marcus@irondistrict.com',
        passwordHash: 'coach123',
        role: 'STAFF',
        status: 'ACTIVE',
        createdAt: '2026-01-10T00:00:00.000Z',
        updatedAt: '2026-01-10T00:00:00.000Z',
      },
      {
        id: 'user-member-1',
        email: 'member@test.com',
        passwordHash: 'member123',
        role: 'MEMBER',
        status: 'ACTIVE',
        createdAt: '2026-02-01T00:00:00.000Z',
        updatedAt: '2026-02-01T00:00:00.000Z',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.PROFILES)) {
    const initialProfiles: MemberProfile[] = [
      {
        id: 'prof-admin-1',
        userId: 'user-admin-1',
        fullName: 'Alexander Wright',
        phone: '+1 (555) 902-1144',
        experienceLevel: 'Competitor',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
      {
        id: 'prof-staff-1',
        userId: 'user-staff-1',
        fullName: 'Marcus Vance',
        phone: '+1 (555) 831-2940',
        experienceLevel: 'Advanced',
        createdAt: '2026-01-10T00:00:00.000Z',
        updatedAt: '2026-01-10T00:00:00.000Z',
      },
      {
        id: 'prof-member-1',
        userId: 'user-member-1',
        fullName: 'Jordan Miller',
        phone: '+1 (555) 234-5678',
        address: '742 Evergreen Terrace, District 4',
        emergencyContact: 'Sarah Miller (+1 555-998-0011)',
        experienceLevel: 'Intermediate',
        inbodyScanDate: '2026-09-15',
        createdAt: '2026-02-01T00:00:00.000Z',
        updatedAt: '2026-02-01T00:00:00.000Z',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(initialProfiles));
  }

  if (!localStorage.getItem(STORAGE_KEYS.PLANS)) {
    const initialPlans: StoredMembershipPlan[] = [
      {
        id: 'plan-essential',
        name: 'Essential',
        price: 1999,
        currency: 'INR',
        durationMonths: 1,
        highlighted: false,
        description: 'Ideal for disciplined self-starters who want premium strength equipment without fluff.',
        features: [
          'Full access to strength & free-weight floor',
          'Locker room & executive shower amenities',
          'Complimentary initial movement screening',
          'Member mobile app for facility check-in',
          'Standard operating hours access (5AM - 11PM)',
        ],
        notIncluded: [
          'Coach-led group training classes',
          'Contrast therapy suite (Sauna & Cold Plunges)',
          'Nutritional consultation',
        ],
        isAvailable: true,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
      {
        id: 'plan-performance',
        name: 'Performance',
        price: 3499,
        currency: 'INR',
        durationMonths: 1,
        badge: 'MOST POPULAR',
        highlighted: true,
        description: 'The complete athletic package. Unlimited coach-led conditioning, lifting sessions, and recovery perks.',
        features: [
          'All Essential tier privileges',
          'Unlimited Coach-led Group Classes (HIIT, Strength, Mobility)',
          'Priority online class reservations (7-day advance)',
          'Access to Infrared Sauna & Cold Plunge suites',
          'Monthly InBody body composition scan',
          '2 Guest passes per month',
        ],
        isAvailable: true,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
      {
        id: 'plan-elite',
        name: 'Elite Athlete',
        price: 5499,
        currency: 'INR',
        durationMonths: 1,
        highlighted: false,
        description: 'For uncompromising athletes demanding personalized 1-on-1 guidance, recovery suite, and priority access.',
        features: [
          'All Performance tier privileges',
          'Two 1-on-1 Personal Coaching sessions monthly',
          'Custom nutrition programming & coach check-in',
          'Unlimited contrast recovery suite usage',
          'Complimentary gym apparel & performance shaker',
          'Unlimited guest passes with advance booking',
          'Private VIP locker reservation',
        ],
        isAvailable: true,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(initialPlans));
  }

  if (!localStorage.getItem(STORAGE_KEYS.MEMBERSHIPS)) {
    const initialMemberships: MembershipRecord[] = [
      {
        id: 'mem-record-1',
        memberId: 'prof-member-1',
        planId: 'plan-performance',
        planNameSnapshot: 'Performance',
        priceSnapshot: 3499,
        currencySnapshot: 'INR',
        durationMonthsSnapshot: 1,
        startDate: '2026-10-01T00:00:00.000Z',
        expiryDate: '2026-11-01T00:00:00.000Z',
        status: 'ACTIVE',
        notes: 'Initial signup with fall promotion',
        createdAt: '2026-10-01T00:00:00.000Z',
        updatedAt: '2026-10-01T00:00:00.000Z',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.MEMBERSHIPS, JSON.stringify(initialMemberships));
  }

  if (!localStorage.getItem(STORAGE_KEYS.PAYMENTS)) {
    const initialPayments: PaymentRecord[] = [
      {
        id: 'pay-1',
        membershipId: 'mem-record-1',
        memberId: 'prof-member-1',
        amount: 3499,
        currency: 'INR',
        provider: 'RAZORPAY_TEST_SIMULATOR',
        providerOrderId: 'order_sim_98231',
        providerPaymentId: 'pay_sim_98231_verified',
        status: 'SUCCESS',
        description: 'Performance Plan (1 Month)',
        receiptNumber: 'REC-2026-001',
        paidAt: '2026-10-01T09:15:00.000Z',
        createdAt: '2026-10-01T09:15:00.000Z',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(initialPayments));
  }

  if (!localStorage.getItem(STORAGE_KEYS.ATTENDANCE)) {
    const initialAttendance: AttendanceRecord[] = [
      { id: 'att-1', memberId: 'prof-member-1', checkInDate: '2026-10-14', checkInTime: '2026-10-14T06:15:00.000Z', zone: 'Iron Deck A', recordedByRole: 'SELF' },
      { id: 'att-2', memberId: 'prof-member-1', checkInDate: '2026-10-12', checkInTime: '2026-10-12T07:30:00.000Z', zone: 'Turf Zone', recordedByRole: 'SELF' },
      { id: 'att-3', memberId: 'prof-member-1', checkInDate: '2026-10-10', checkInTime: '2026-10-10T17:45:00.000Z', zone: 'Recovery Studio', recordedByRole: 'STAFF' },
      { id: 'att-4', memberId: 'prof-member-1', checkInDate: '2026-10-08', checkInTime: '2026-10-08T06:00:00.000Z', zone: 'Iron Deck A', recordedByRole: 'SELF' },
    ];
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(initialAttendance));
  }

  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    const initialBookings: ClassBookingRecord[] = [
      {
        id: 'book-1',
        classId: 'c-strength-1',
        className: 'Strength & Powerlifting',
        memberId: 'prof-member-1',
        scheduledTime: '06:00 AM',
        scheduledDay: 'Wednesday',
        trainerName: 'Marcus Vance',
        room: 'Iron Deck A',
        status: 'CONFIRMED',
        bookedAt: '2026-10-14T10:00:00.000Z',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(initialBookings));
  }

  if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
    const initialEnquiries: EnquiryRecord[] = [
      {
        id: 'enq-1',
        name: 'Carlos Mendez',
        email: 'carlos.m@example.com',
        phone: '+1 (555) 777-3829',
        topic: '1-on-1 Personal Training',
        message: 'Looking to hire a coach for deadlift biomechanics and Olympic lifting prep.',
        status: 'NEW',
        createdAt: '2026-10-14T18:22:00.000Z',
      },
      {
        id: 'enq-2',
        name: 'Jessica Reynolds',
        email: 'jreynolds@sample.com',
        phone: '+1 (555) 441-9988',
        topic: 'Recovery Suite Day Pass',
        message: 'Do you offer contrast sauna day passes for visiting marathon runners?',
        status: 'CONTACTED',
        adminNotes: 'Called on Oct 15, offered trial week.',
        createdAt: '2026-10-13T11:10:00.000Z',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(initialEnquiries));
  }

  if (!localStorage.getItem(STORAGE_KEYS.AUDIT)) {
    const initialAudit: AuditLogRecord[] = [
      {
        id: 'aud-1',
        action: 'SYSTEM_INITIALIZED',
        performedByUserId: 'user-admin-1',
        performedByEmail: 'admin@irondistrict.com',
        targetEntity: 'SYSTEM',
        targetId: 'CONFIG',
        details: 'Initial enterprise database and permission models initialized.',
        timestamp: '2026-01-01T00:00:00.000Z',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(initialAudit));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    const initialSettings: GymSettings = {
      gymName: 'IRON DISTRICT FITNESS',
      address: '420 Ironworks Avenue, District 4, Metro City',
      phone: '+1 (555) 019-4820',
      email: 'contact@irondistrictfitness-demo.com',
      currency: 'INR',
      timezone: 'America/New_York (EST)',
      allowSelfCheckIn: true,
      maxDailyCheckIns: 1,
      gracePeriodDays: 3,
    };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialSettings));
  }
}

// Database helper functions with strict typing and entity isolation
export const db = {
  getUsers: (): User[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'),
  saveUsers: (data: User[]) => localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(data)),

  getProfiles: (): MemberProfile[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILES) || '[]'),
  saveProfiles: (data: MemberProfile[]) => localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(data)),

  getPlans: (): StoredMembershipPlan[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.PLANS) || '[]'),
  savePlans: (data: StoredMembershipPlan[]) => localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(data)),

  getMemberships: (): MembershipRecord[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMBERSHIPS) || '[]'),
  saveMemberships: (data: MembershipRecord[]) => localStorage.setItem(STORAGE_KEYS.MEMBERSHIPS, JSON.stringify(data)),

  getPayments: (): PaymentRecord[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYMENTS) || '[]'),
  savePayments: (data: PaymentRecord[]) => localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(data)),

  getAttendance: (): AttendanceRecord[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || '[]'),
  saveAttendance: (data: AttendanceRecord[]) => localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(data)),

  getBookings: (): ClassBookingRecord[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]'),
  saveBookings: (data: ClassBookingRecord[]) => localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(data)),

  getEnquiries: (): EnquiryRecord[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES) || '[]'),
  saveEnquiries: (data: EnquiryRecord[]) => localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(data)),

  getAuditLogs: (): AuditLogRecord[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT) || '[]'),
  logAction: (action: string, user: { id: string; email: string }, targetEntity: string, targetId: string, details: string) => {
    const logs: AuditLogRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT) || '[]');
    const newLog: AuditLogRecord = {
      id: `aud-${Date.now()}`,
      action,
      performedByUserId: user.id,
      performedByEmail: user.email,
      targetEntity,
      targetId,
      details,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(logs.slice(0, 200)));
  },

  getSettings: (): GymSettings => JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}'),
  saveSettings: (settings: GymSettings) => localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)),

  getSession: (): { user: User; profile: MemberProfile } | null => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  saveSession: (session: { user: User; profile: MemberProfile } | null) => {
    if (session) {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    }
  },
};
