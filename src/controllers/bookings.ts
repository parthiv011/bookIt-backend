import { Request, Response } from 'express';
import prisma from '../db';

export async function getBookings(req: Request, res: Response) {
  try {
    const bookings = await prisma.bookings.findMany({
      select: {
        id: true,
        createdAt: true,
        startDate: true,
        endDate: true,
        numNights: true,
        numGuests: true,
        status: true,
        totalPrice: true,
        cabin: {
          select: {
            name: true,
          },
        },
        guests: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Failed to get bookings', error);
    res.status(500).json({ error: 'Failed to get bookings' });
  }
}

export async function getBookingsById() {}
export async function updateBookings() {}
export async function deleteBookings() {}
