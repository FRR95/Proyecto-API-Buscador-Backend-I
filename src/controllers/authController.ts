
import bcrypt from "bcrypt";
import { Request, Response } from "express"
import { User } from "../models/User";
import jwt from "jsonwebtoken";

// AUTH

export const SignInService = async (req: Request, res: Response) => {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password_hash;
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        if (password.length < 6 || password.legth > 10) {
            return res.status(400).json({
                succes: false,
                message: "La contraseña debe estar entre 6 y 10 caracteres"
            })
        }
        const emailRepeated = await User.findOne({
            where: {
                email: email
            }
        })

        if (emailRepeated) {
            return res.status(400).json({
                succes: false,
                message: "El email ya existe"
            })
        }



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




        const NewUser = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password_hash: passwordEncrypted,
            role: {
                id: 3
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
    ///"first_name":"Francisco",
    ///"last_name":"Rocher",
    ///"email":"fran@gmail.com",
    ///"password_hash":"1234567"
}
export const LogInService = async (req: Request, res: Response) => {
    try {
        const email = req.body.email
        const password = req.body.password_hash
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        

        //todo validar formato email 
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "format email is invalid"
                }
            )
        }
        const user = await User.findOne({
            where: {
                email: email
            },
            relations: {
                role: true
            },
            select: {
                id: true,
                email: true,
                first_name: true,
                password_hash: true,
                role: {
                    name: true
                }
            }
        })



        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist",

            })
        }
        const isValidPassword = bcrypt.compareSync(password, user.password_hash)
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Password is not valid",

            })
        }
        const token = jwt.sign({
            userId: user.id,
            roleName: user.role.name,
            first_name: user.first_name
        },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "2h"
            }
        )

        const showUser = await User.find({
            where: {
                email: email
            },
            relations: {
                role: true
            },
            select: {
                role: {
                    name: true
                }
            }
        })

        res.status(201).json({
            success: true,
            message: "User logged succesfully",
            token: token,
            data: showUser

        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User can't be logged ",
            error: error
        })
    }

    ///"email":"fran@gmail.com",
    ///"password_hash":"1234567"
}