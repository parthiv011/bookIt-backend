import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const getCabinData = async (req: Request, res: Response) => {
  try {
    const cabins = await prisma.cabins.findMany({
      select: {
        id: true,
        name: true,
        maxCapacity: true,
        regularPrice: true,
        discount: true,
        image: true,
      },
    });

    // const calculateDiscount = cabins.map((cabin) => {
    //   const discount =
    //     cabin.regularPrice > 1500
    //       ? cabin.regularPrice * 0.4
    //       : cabin.regularPrice * 0.15;

    //   return {
    //     cabin,
    //     discount,
    //   };
    // });

    res.json({
      cabins,
    });
  } catch (e) {
    console.log('Failed to get Todos', e);
  }
};

export const deleteCabin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cabinId = parseInt(id);

    if (isNaN(cabinId)) {
      return res.status(400).json({ error: 'Invalid cabin ID' });
    }

    const cabin = await prisma.cabins.findUnique({
      where: { id: cabinId },
    });

    if (!cabin) {
      return res.status(404).json({ error: 'Cabin not found' });
    }

    await prisma.cabins.delete({
      where: { id: cabinId },
    });

    res.json({
      msg: 'Cabin deleted successfully!',
    });
  } catch (error) {
    console.error('Error deleting cabin:', error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export const createCabin = async (req: Request, res: Response) => {
  try {
    const { name, maxCapacity, regularPrice, discount, description, image } =
      req.body;

    const cabin = await prisma.cabins.create({
      data: {
        name,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image,
      },
    });

    res.json({
      cabin,
      msg: 'Cabin created successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export const updateCabin = async (req: Request, res: Response) => {};
