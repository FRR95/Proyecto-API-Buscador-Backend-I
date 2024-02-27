import { Request, Response } from "express"
import { User } from "../models/User";

export const GetHealthy=(req:Request,res:Response)=>{
    res.status(200).json(
    
    {
    
    sucess:true,
    message:"Server is healthy"
    
    }
    );
    }


// AUTH

export const SignInService=async(req:Request,res:Response)=>{
   try {
    const first_name=req.body.first_name;
    const last_name=req.body.last_name;
    const email=req.body.email;
    const password_hash=req.body.password_hash;
    const role_id=req.body.role_id;


    const NewUser=await User.create({
    //  first_name:first_name,
    //  last_name:last_name,
    //  email:email,
    //  password_hash:password_hash,
    role_id:role_id
    }).save()


    res.status(200).json({
        success:true,
        message:"User created",
        data:NewUser
    })
   } 
   
   catch (error) {
    res.status(400).json({
        success:true,
        message:"Can't create role",
        error:error
    })
   } 

}
export const LogInService=(req:Request,res:Response)=>{

}


//USERS

export const GetUsers=(req:Request,res:Response)=>{

}
export const GetUserInfo=(req:Request,res:Response)=>{

}
export const UpdateUserInfo=(req:Request,res:Response)=>{

}
export const FilterUserInfo=(req:Request,res:Response)=>{

}
export const DeleteUser=(req:Request,res:Response)=>{

}
export const UpdateUserRole=(req:Request,res:Response)=>{

}


//APPOINTMENTS

export const PostAppointment=(req:Request,res:Response)=>{

}
export const UpdateAppointment=(req:Request,res:Response)=>{

}
export const RecoverAppointments=(req:Request,res:Response)=>{

}
export const GetUserAppointments=(req:Request,res:Response)=>{

}


//SERVICES

export const GetServices=(req:Request,res:Response)=>{

}
export const PostService=(req:Request,res:Response)=>{

}
export const UpdateService=(req:Request,res:Response)=>{

}
export const DeleteService=(req:Request,res:Response)=>{

}
