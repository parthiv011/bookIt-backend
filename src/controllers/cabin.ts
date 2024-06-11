import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
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

const dataDir = path.join(__dirname, '../../data/');
if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
    process.exit(1);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dataDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadMiddleware = upload.single('image');

export const createCabin = async (req: Request, res: Response) => {
  uploadMiddleware(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        error: err.message,
      });
    } else if (err) {
      return res.status(500).json({
        error: 'File Upload failed',
      });
    }

    try {
      const { name, maxCapacity, regularPrice, discount, description } =
        req.body;
      const image = req.file?.filename;

      if (!image) {
        return res.status(400).json({
          error: 'Image file is required',
        });
      }

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
  });
};

export const updateCabin = async (req: Request, res: Response) => {};
