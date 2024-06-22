import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import prisma from '../db';

declare module 'express-serve-static-core' {
  interface Request {
    id?: string | JwtPayload;
    user?: any;
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.cookies.authorization;
  console.log(authToken);
  if (!authToken || !authToken.startsWith('Bearer ')) {
    return res.status(403).json({
      msg: 'Invalid Token Format!',
    });
  }

  const token = authToken.split(' ')[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.id = decoded.id;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(404).json({
        msg: 'User not found',
      });
    }
    req.user = user;
    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        msg: 'Token expired',
      });
    }
    return res.status(403).json({
      msg: 'Authentication failed!',
    });
  }
};

export default authMiddleware;
