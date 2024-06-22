import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db';
import { JWT_SECRET } from '../config';

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email, password: password },
    });
    if (!user) {
      return res.status(404).json({
        msg: 'Invalid Username / User doesnt Exists!',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET
    );

    return res.json({
      id: user.id,
      token: token,
      email: email,
      name: `${user.firstName} ${user.lastName}`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return res.status(409).json({
        msg: 'User Already exists!',
      });
    }
    const newUser = await prisma.user.create({
      data: { email, password, firstName, lastName },
      select: {
        id: true,
        email: true,
      },
    });
    const token = jwt.sign(
      {
        id: newUser.id,
      },
      JWT_SECRET
    );
    return res.status(201).json({
      msg: 'User registered Succeesfully',
      token,
      newUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  res.json(req.user);
}
