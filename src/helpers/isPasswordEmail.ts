import { Request, Response } from "express";


export const isPasswordEmailHelper =async (req:Request,res:Response)=>{

    const email = req.body.email;
    const password = req.body.password_hash;
 
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are needed ",

        })
    }

    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (!validEmail.test(email)) {
        return res.status(400).json(
            {
                success: false,
                message: "format email is invalid"
            }
        )
    }
}