import { Request, Response } from "express"

export const GetHealthy=(req:Request,res:Response)=>{
    res.status(200).json(
    
    {
    
    sucess:true,
    message:"Server is healthy"
    
    }
    );
    }


// AUTH

export const SignInService=(req:Request,res:Response)=>{

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
