// src/middleware/redisMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import { Redis as RedisClientType } from 'ioredis';
import RedisConnection from '../connections/redisConnection';

declare module 'express' {
  interface Request {
    redisClient?: RedisClientType;
  }
}
console.log("Redis running")

const redisMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const redisConnection = RedisConnection.getInstance();
    req.redisClient = redisConnection.getClient();

    next();
  } catch (err) {
    console.error('Redis middleware error:', err);
    next(err);
  }
};

export default redisMiddleware;