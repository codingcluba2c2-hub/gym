# IRON DISTRICT FITNESS — Enterprise Gym Management Platform

An enterprise-grade, full-stack membership lifecycle, member dashboard, and administrative management platform integrated directly with the public website for **IRON DISTRICT FITNESS**.

---

## 🌟 Architecture Overview

1. **Public Gym Showcase**:
   - Preserved all public marketing sections (Hero, Programs, Schedule, Testimonials, Gallery Lightbox, FAQs, Contact Form).
   - Modern, athletic aesthetic: Dark Mode (`#090909`), Charcoal surfaces (`#151515`), and Electric Orange accent (`#FF5A1F`).
   - Integrated **"Portal Login"** in the top navigation.

2. **Enterprise Authentication & Access Control (RBAC)**:
   - **ADMIN**: Complete system governance, plan configuration, staff promotion, audit log inspection, manual extensions, and CSV exports.
   - **STAFF**: Gym floor check-in recording, enquiry tracking, and attendance desk management.
   - **MEMBER**: Private dashboard, active plan inspection, attendance history, receipt downloads, and profile editing.
   - **Strict Security Rules**:
     - Public registration exclusively creates `MEMBER` accounts.
     - Role elevation is protected and logged in the immutable audit log.
     - Simulated rate limiting prevents brute-force login attempts (5 attempts / 5 mins).

3. **Database Schema & Prisma Model** ([`prisma/schema.prisma`](./prisma/schema.prisma)):
   - Production PostgreSQL schema covering all 12 enterprise models:
     - `User`, `MemberProfile`, `MembershipPlan`, `Membership`, `Payment`, `Attendance`, `Trainer`, `FitnessClass`, `ClassBooking`, `Enquiry`, `Notification`, and `AuditLog`.
   - Preserves snapshot fields on `Membership` (`planNameSnapshot`, `priceSnapshot`, `durationMonthsSnapshot`, `currencySnapshot`) so later plan updates never rewrite historical receipts.
   - Implements decimal currency types, unique constraints, and check-in uniqueness (`[memberId, checkInDate]`).

4. **Membership Lifecycle & Razorpay Checkout Simulator**:
   - Full state transitions: `PENDING_PAYMENT` &rarr; `ACTIVE` &rarr; `EXPIRED` &rarr; `SUSPENDED` &rarr; `CANCELLED`.
   - Atomic verified payment simulation ensuring memberships only activate upon valid signature verification.
   - Handles both successful activations and rejected/failed transactions without phantom activations.

5. **Member Portal** ([`src/components/member/MemberDashboard.tsx`](./src/components/member/MemberDashboard.tsx)):
   - **Overview**: Active plan tier, days remaining counter, recent booked classes, and quick facility check-in.
   - **My Membership**: Current plan details, historical snapshot records, and 1-click Razorpay payment simulator for upgrades and renewals.
   - **Attendance History**: Date-wise logs, check-in timestamps, and facility zones.
   - **Billing & Receipts**: Verifiable receipt IDs (`REC-2026-XXXX`) with gateway order references.
   - **Personal Profile**: Update emergency contact, phone, address, and account password.

6. **Admin Control Panel** ([`src/components/admin/AdminPanel.tsx`](./src/components/admin/AdminPanel.tsx)):
   - **Operations & Revenue KPI Cards**: Total members, active memberships, verified revenue, pending checkouts, and new inquiries.
   - **Member Directory**: Live search by name/phone and 1-click staff promotion.
   - **Membership Plans Catalog**: Edit plan prices, duration, descriptions, and toggle availability (archive plans without deleting historical member records).
   - **Subscriptions Manager**: Audited membership days extension with required reason notes, and suspension controls.
   - **Payment Ledger**: Searchable transaction references and provider order IDs.
   - **Attendance Desk**: Staff check-in form with duplicate prevention.
   - **Enquiry Manager**: Status workflows (`NEW`, `IN_REVIEW`, `CONTACTED`, `RESOLVED`).
   - **Reports & CSV Exports**: Instant 1-click CSV download of payments, members, and attendance logs.
   - **Security Audit Trail**: Immutable log of administrative actions, logins, role modifications, and plan updates.

---

## 🔑 Demo Login Credentials

The system initializes default accounts for instant testing:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@irondistrict.com` | `admin123` |
| **Staff** | `coach.marcus@irondistrict.com` | `coach123` |
| **Member** | `member@test.com` | `member123` |

*Note: The Auth Modal also includes 1-click credential buttons for testing.*

---

## 🚀 Running Locally

From the `gym/frontend` directory:

```powershell
cd c:\Users\akhla\Desktop\GYM\frontend
npm run dev
```

To build and preview the production bundle:

```powershell
npm run build
npm run preview
```

---

## ✅ Quality & Validation Status

- **TypeScript**: `tsc -b` passed with **0 errors**.
- **Linter**: `oxlint` passed with **0 errors and 0 warnings**.
- **Production Build**: Verified client bundle built in ~1.2s.
