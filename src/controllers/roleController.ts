import { Request, Response } from "express"
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const GetHealthy = (req: Request, res: Response) => {
    res.status(200).json(

        {

            sucess: true,
            message: "Server is healthy"

        }
    );
}


// AUTH

export const SignInService = async (req: Request, res: Response) => {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const password_hash = req.body.password_hash;
        const role_id = req.body.role_id;

        const name = req.body.name;
        const password = req.body.password_hash;

        if (password.length < 6 || password.legth > 10) {
            return res.status(400).json({
                succes: false,
                message: "La contraseña debe estar entre 6 y 10 caracteres"
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

        //Encrypt Password
        const passwordEncrypted = bcrypt.hashSync(password, 8);

        //Test encrypted password

        // console.log(passwordEncrypted);


        const NewUser = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password_hash: passwordEncrypted,
            role: {
                id: 1
            }
        }).save()


        return res.status(201).json({
            success: true,
            message: "User created succesfully",
            data: NewUser
        })
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: "User can't be created ",
            error: error
        })
    }

}
export const LogInService = (req: Request, res: Response) => {

}


//USERS

export const GetUsers = async (req: Request, res: Response) => {
    try {

    //   const users=  await User.find()
    const users=  await User.find({
    select:{
    id:true,
    first_name:true
    }
    })


        res.status(200).json({
            success: true,
            message: "User retieves succesfully ",
            data:users

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User can't be retrieved ",
            error: error
        })
    }
}
export const GetUserInfo = (req: Request, res: Response) => {

}
export const UpdateUserInfo = (req: Request, res: Response) => {

}
export const FilterUserInfo = (req: Request, res: Response) => {

}
export const DeleteUser = (req: Request, res: Response) => {

}
export const UpdateUserRole = (req: Request, res: Response) => {

}


//APPOINTMENTS

export const PostAppointment = (req: Request, res: Response) => {

}
export const UpdateAppointment = (req: Request, res: Response) => {

}
export const RecoverAppointments = (req: Request, res: Response) => {

}
export const GetUserAppointments = (req: Request, res: Response) => {

}


//SERVICES

export const GetServices = (req: Request, res: Response) => {

}
export const PostService = (req: Request, res: Response) => {

}
export const UpdateService = (req: Request, res: Response) => {

}
export const DeleteService = (req: Request, res: Response) => {

}
