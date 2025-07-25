// server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import oneRoute from './routes/oneRoute';
import redisMiddleware from './middlewares/redisMiddleware';
import RedisConnection from './connections/redisConnection';

const app = express();

// ✅ Trust proxy for rate limiting (important on Firebase / cloud)
app.set('trust proxy', 1);

// ✅ Basic middleware stack
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(hpp());
app.use(helmet());
app.use(morgan('dev'));

// ✅ Compression (skip for event-streams like SSE)
app.use(compression({
  filter: (_req: Request, res: Response) => {
    const contentType = res.getHeader('Content-Type');
    return typeof contentType === 'string' && !contentType.includes('text/event-stream');
  }
}));

// ✅ CORS
const corsOptions = {
  origin: '*', // 🔐 Replace with domain list for prod
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ✅ Rate Limiter to avoid abuse (like Firebase billing attacks 💸)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// ✅ Simple Health Check (Optional)
app.get('/api/health', (_req, res) => {
  res.status(200).send('🔥 Firebase Express API up and running!');
});

app.get('/health/redis', async (req, res) => {
  const client = RedisConnection.getInstance().getClient();
  const pong = await client.ping();
  res.send({ status: pong });
});

app.use(redisMiddleware)

// ✅ Modular Routes Mounting
app.use('/api', oneRoute);

export default app;
