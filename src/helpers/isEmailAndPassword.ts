import { NextFunction, Request, Response } from "express";

import { User } from "../models/User";

export const isEmailAndPasswordHelper =async (req:Request,res:Response,next:NextFunction)=>{
const password=req.body.password_hash
const email=req.body.password_email
  
    if (!password||email) {
        return res.status(500).json({
            success: false,
            message: "Password and email are needed ",

        })
    }
next()
}