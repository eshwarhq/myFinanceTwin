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

        if (!name || !email || !password || !agreedToTerms) {
            return res.json({
                success: false,
                message: "Missing credentials"
            })
        }

        // const user = await getAuth().createUser({
        //     email,
        //     password,
        //     displayName: name
        // });
        try {
            await db.collection('users').doc('123456').set({
                email,
                agreedToTerms,
                createdAt: Date.now(),
            });
        } catch (err) {
            console.error("❌ Firestore write failed:", err);
        }


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