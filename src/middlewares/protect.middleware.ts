import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utilities/auth.js';


export interface AuthRequest extends Request {
  user?: string | object;
}

const protectMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.token as string;

  if (!token) {
    res.status(401);
    res.json({ message: 'You are not authorized' });
    return;
  }
  try {
    const user = verifyToken(token);
    req.body.user = user;
  
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.json({ message: 'You are not authorized' });
    return;
  }
};

export default protectMiddleware;