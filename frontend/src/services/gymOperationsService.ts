import { db } from './enterpriseStorage';
import type { AttendanceRecord, ClassBookingRecord } from '../types/gymEnterprise';

export const gymOperationsService = {
  // ATTENDANCE: Record Check-In with daily duplicate prevention
  recordCheckIn: (
    memberId: string,
    zone: string = 'Main Deck',
    recordedByRole: 'SELF' | 'STAFF' | 'ADMIN' = 'SELF'
  ): { success: boolean; message: string; record?: AttendanceRecord } => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const attendances = db.getAttendance();

    // Check if member already checked in today
    const alreadyCheckedIn = attendances.some(
      (a) => a.memberId === memberId && a.checkInDate === todayStr
    );

    if (alreadyCheckedIn) {
      return {
        success: false,
        message: 'Daily check-in limit reached: Member has already checked in today.',
      };
    }

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      memberId,
      checkInDate: todayStr,
      checkInTime: new Date().toISOString(),
      zone,
      recordedByRole,
    };

    attendances.unshift(newRecord);
    db.saveAttendance(attendances);

    return {
      success: true,
      message: `Check-in recorded successfully for ${zone}!`,
      record: newRecord,
    };
  },

  // Get member attendance history
  getMemberAttendance: (memberId: string): AttendanceRecord[] => {
    const all = db.getAttendance();
    return all.filter((a) => a.memberId === memberId);
  },

  // CLASS BOOKINGS: Book Class
  bookClass: (
    memberId: string,
    classId: string,
    className: string,
    scheduledDay: string,
    scheduledTime: string,
    trainerName: string,
    room: string
  ): { success: boolean; message: string; booking?: ClassBookingRecord } => {
    const bookings = db.getBookings();

    // Prevent duplicate booking for the same class and day
    const existing = bookings.find(
      (b) => b.memberId === memberId && b.className === className && b.scheduledDay === scheduledDay && b.status === 'CONFIRMED'
    );

    if (existing) {
      return { success: false, message: 'You have already booked a spot for this session.' };
    }

    const newBooking: ClassBookingRecord = {
      id: `book-${Date.now()}`,
      classId,
      className,
      memberId,
      scheduledTime,
      scheduledDay,
      trainerName,
      room,
      status: 'CONFIRMED',
      bookedAt: new Date().toISOString(),
    };

    bookings.unshift(newBooking);
    db.saveBookings(bookings);

    return {
      success: true,
      message: `Spot confirmed for ${className} on ${scheduledDay} at ${scheduledTime}!`,
      booking: newBooking,
    };
  },

  // Cancel Booking
  cancelBooking: (bookingId: string, memberId: string): { success: boolean; message: string } => {
    const bookings = db.getBookings();
    const idx = bookings.findIndex((b) => b.id === bookingId && b.memberId === memberId);
    if (idx === -1) return { success: false, message: 'Booking not found.' };

    bookings[idx].status = 'CANCELLED';
    db.saveBookings(bookings);

    return { success: true, message: 'Class reservation has been cancelled.' };
  },

  // Get Member Bookings
  getMemberBookings: (memberId: string): ClassBookingRecord[] => {
    const bookings = db.getBookings();
    return bookings.filter((b) => b.memberId === memberId);
  },
};
