import { Request, Response } from "express"
import { User } from "../models/User";
import { FindOperator, Like } from "typeorm";




//USERS

export const GetUsers = async (req: Request, res: Response) => {
    try {
        const email=req.query.email
        const first_name=req.query.first_name

        interface queryFilters{
         email?:FindOperator<string>
         name?:FindOperator<string>
        }
       const queryFilters:queryFilters ={}

        if(email){
            queryFilters.email=Like("%"+req.query.email?.toString()+"%")
            }
        if(first_name){
            queryFilters.name=Like("%"+req.query.first_name?.toString()+"%")
            }
        
        // const users = await User.find()
        const users=  await User.find({
        where: queryFilters,
        
        select:{
        id:true,
        first_name:true,
        email:true
        }
        })


        return res.status(200).json({
            success: true,
            message: "Users retrieved succesfully ",
            data: users

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Users can't be retrieved ",
            error: error
        })
    }
}
export const GetUserInfo = async (req: Request, res: Response) => {

    try {
        const userId = req.tokenData.userId;

        const user = await User.findOneBy({
            id: userId
        })

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User not found ",

            })
        }

        return res.status(200).json({
            success: true,
            message: "User retrieved succesfully ",
            data: user

        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User can't be retrieved ",
            error: error
        })
    }
}
export const UpdateUserInfo = async (req: Request, res: Response) => {
    try {

        const userId = req.tokenData.userId;
        const name = req.body.first_name;

        const user = await User.findOneBy({
            id: userId
        })

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User not found ",

            })
        }
        const userUpdated = await User.update(
            {
                id: userId
            },
            {
                first_name: name
            }
        )


        return res.status(200).json({
            success: true,
            message: "User updated succesfully ",
            data: userUpdated
        })

    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: "User can't be updated ",
            error: error
        })
    }

}
export const FilterUserInfo = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const findEmail = await User.findOneBy({


            email: email

        })


        if (!findEmail) {
            return res.status(400).json({
                success: false,
                message: "Email not found",

            })
        }

        const filterEmail = await User.find({
            select: {
                email: true
            },
            where: {
                email: email
            }
        })
        res.status(201).json({
            success: true,
            message: "Email filtered succesfully",
            data: filterEmail
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found ",
            error: error
        })
    }
}
export const DeleteUser = async (req: Request, res: Response) => {
    try {

        const userId = req.params.id;



        const userToRemove: any = await User.findOneBy({
            id: parseInt(userId),
        })


        if (!userToRemove) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        const userIdRemoved = await User.remove(userToRemove)

        return res.status(200).json({
            success: true,
            message: "User deleted succesfully ",
            data: userIdRemoved
        })


    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User can't be deleted ",
            error: error
        })
    }
}
export const UpdateUserRole = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const role_id = req.body.role_id;

        const user = await User.findOneBy({
            id: parseInt(userId)
        })

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User not found ",

            })
        }
        const userUpdated = await User.update(
            {
                id: parseInt(userId)
            },
            {
                role: {
                    id: role_id
                }
            }
        )


        return res.status(200).json({
            success: true,
            message: "User updated succesfully ",
            data: userUpdated
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role can't be changed",
            error: error
        })
    }
}