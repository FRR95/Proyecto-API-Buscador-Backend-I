import { Request, Response } from "express"

export const GetHealthy=(req:Request,res:Response)=>{
    res.status(200).json(
    
    {
    
    sucess:true,
    message:"Server is healthy"
    
    }
    );
    }