// src/routes/oneRoute.ts
import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

// 🧭 Welcome Route
router.get('/', (_req: Request, res: Response) => {
  res.send('☠️ Welcome to Team Luffy\'s Backend — One Route to rule them all!');
});

// 🐵 Dummy Luffy Route (you can add more later)
router.get('/luffy', (_req: Request, res: Response) => {
  res.json({
    message: 'Gomu Gomu no... JSON!',
    captain: 'Monkey D. Luffy',
    role: 'Future Pirate King',
  });
});

export default router;
