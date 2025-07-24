// src/servers/RedisConnection.ts
import Redis, { Redis as RedisClientType } from 'ioredis';

class RedisConnection {
  private static instance: RedisConnection;
  private client: RedisClientType;

  private constructor() {
    this.client = new Redis({
      host: 'localhost',
      port: parseInt('6379'),
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });

    this.client.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  public static getInstance(): RedisConnection {
    if (!RedisConnection.instance) {
      RedisConnection.instance = new RedisConnection();
    }
    return RedisConnection.instance;
  }

  public getClient(): RedisClientType {
    return this.client;
  }

  public async disconnect(): Promise<void> {
    await this.client.quit();
  }
}

export default RedisConnection;