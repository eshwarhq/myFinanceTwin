// src/routes/oneRoute.ts
import express from 'express';
import type { Request, Response } from 'express';
import authUser from '../services/authUser';
import * as fiMcpService from '../services/fiMcpService';

import chatService from '../services/chatService';

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

router.post('/fi-mcp/:toolName', async (req, res) => {
  try {
    const data = await fiMcpService.callTool(req.params.toolName, req.body, req.headers['mcp-session-id']);
    res.json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
});

router.post('/signup', authUser.signUp)
router.post('/signIn', authUser.signIn);
router.get('/streamChat', chatService.chat)

export default router;
