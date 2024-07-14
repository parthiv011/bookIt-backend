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
export async function getBookingsAfterDate(req: Request, res: Response) {
  try {
    // Get the date from query parameters or default to the current date
    const { date } = req.query;

    // Validate the date parameter
    const parseDate = date ? new Date(date as string) : new Date();
    if (isNaN(parseDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const response = await prisma.bookings.findMany({
      where: {
        createdAt: {
          gte: parseDate,
        },
      },
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

    const bookingsLength = response.length;
    res.status(200).json({ bookingsLength, response });
  } catch (error) {
    console.error('Failed to get bookings', error);
    res.status(500).json({ error: 'Failed to get bookings' });
  }
}
export async function getStaysAfterDate(req: Request, res: Response) {
  // Get the date from query parameters or default to the current date
  const dateParam = req.query.date;
  const date = dateParam ? new Date(dateParam as string) : new Date();

  // Validate the date parameter
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  try {
    const stays = await prisma.bookings.findMany({
      where: {
        startDate: {
          gte: date,
        },
      },
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

    const staysLength = stays.length;
    res.status(200).json({ staysLength, stays });
  } catch (error) {
    console.error('Failed to get bookings', error);
    res.status(500).json({ error: 'Failed to get bookings' });
  }
}
