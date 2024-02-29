import { Request, Response } from "express"
import { User } from "../models/User";




//USERS

export const GetUsers = async (req: Request, res: Response) => {
    try {

        const users = await User.find()
        // const users=  await User.find({
        // select:{
        // id:true,
        // first_name:true
        // }
        // })


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
export const FilterUserInfo = (req: Request, res: Response) => {

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
export const UpdateUserRole = (req: Request, res: Response) => {

}