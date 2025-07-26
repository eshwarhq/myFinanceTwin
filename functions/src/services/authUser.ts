import { Request, Response } from "express"
// import { getAuth } from "firebase-admin/auth";
import { db } from "../connections/databaseConnection";

const signUp = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            password,
            agreedToTerms
        } = req.body;
        console.log(req.body)
        const redis = req.redisClient;
        if (!name || !email || !password || !agreedToTerms) {
            return res.json({
                success: false,
                message: "Missing credentials"
            })
        }

        const uid = '123456'

        // const user = await getAuth().createUser({
        //     email,
        //     password,
        //     displayName: name
        // });
        try {
            await db.collection('users').doc(uid).set({
                email,
                agreedToTerms,
                createdAt: Date.now(),
            });
        } catch (err) {
            console.error("❌ Firestore write failed:", err);
        }

        await redis?.set(uid, JSON.stringify(req.body), 'EX', 60 * 60); // 1 hour expiry
        const sessionData = await redis?.get(uid);

        console.log('Retrieval: ', sessionData)
        // Set cookie in browser
        res.cookie('session_id', uid, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // 1 hour
            sameSite: 'lax',
            secure: false, // change to true on HTTPS
        });

        return res.status(200).json({
            uid: '12345'
        })

    } catch (error) {
        console.error(error)
        return res.json({
            success: false,
            error: error
        })
    }
}

export default {
    signUp
}