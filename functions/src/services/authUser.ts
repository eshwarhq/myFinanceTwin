import { Request, Response } from 'express';
import { db, auth } from '../connections/databaseConnection';
import axios from 'axios';

const signUp = async (req: Request, res: Response) => {
  const { name, email, password, mobileNumber, agreedToTerms } = req.body;
  const redis = req.redisClient;

  if (!name || !email || !password || !mobileNumber || !agreedToTerms) {
    return res.status(400).json({ success: false, message: 'Missing credentials' });
  }

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      mobileNumber,
      agreedToTerms,
      mobileNumber,
      createdAt: new Date().toISOString(),
    });

    await redis?.set(userRecord.uid, JSON.stringify(req.body), 'EX', 43200);

    await mcpLoginHelper(userRecord.uid, mobileNumber);

    res.cookie('session_id', userRecord.uid, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: 'lax',
      secure: false, // switch to true on HTTPS
    });

    return res.status(200).json({ success: true, uid: userRecord.uid });
  } catch (error: any) {
    console.error('Signup error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(401).json({ success: false, message: 'Missing ID Token' });
  }

  try {
    const decoded = await auth.verifyIdToken(idToken);
    const userData = await db.collection('users').doc(decoded.uid).get();

    await mcpLoginHelper(userData.data()?.uid,userData.data()?.mobileNumber );

    return res.status(200).json({
      success: true,
      uid: decoded.uid,
      email: decoded.email,
      userData: userData.data(),
    });
  } catch (error) {
    console.error('Login verification failed:', error);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};



export async function mcpLoginHelper(uid: string, phoneNumber: string, otp: string = '1234') {
  const MCP_BASE_URL = 'http://localhost:8080';
  const sessionId = uid.startsWith('mcp-session-') ? uid : `mcp-session-${uid}`;
  try {
    const response = await axios.post(
      `${MCP_BASE_URL}/login`,
      new URLSearchParams({ sessionId, phoneNumber, otp }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    if (response.status === 200) {
      return { success: true, sessionId };
    } else {
      return { success: false, message: 'MCP login failed', sessionId };
    }
  } catch (error: any) {
    return { success: false, message: 'MCP login error', details: error?.response?.data || error.message };
  }
}

export default { signUp, signIn, mcpLoginHelper };
