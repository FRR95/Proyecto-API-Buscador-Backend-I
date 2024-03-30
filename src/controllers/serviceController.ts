import { Request, Response } from "express"
import { Service } from "../models/Service";
//SERVICES

export const GetServices = async (req: Request, res: Response) => {
    try {
        const services = await Service.find({
        select:{
         service_name:true,
         description:true,
         id:true
        }
        })
        res.status(200).json({
            success: true,
            message: "Services retrieved succesfully ",
            data: services

        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Service can't be retrieved ",
            error: error
        })
    }

}
export const PostService = async (req: Request, res: Response) => {

    try {
        const services_name = req.body.service_name;
        const description = req.body.description;

        const NewService = await Service.create({
            service_name: services_name,
            description: description,

        }).save()

        return res.status(201).json({
            success: true,
            message: "Service posted succesfully",
            data: NewService

        })
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: "Service can't be posted ",
            error: error
        })
    }

}
export const UpdateService = async (req: Request, res: Response) => {
    try {
        const serviceId = req.params.id;
        const service_name = req.body.service_name;
        const description = req.body.description;

        const service = await Service.findOneBy({
            id: parseInt(serviceId)
        })
        if (!service) {
            return res.status(500).json({
                success: false,
                message: "Service not found ",

            })
        }
        const serviceUpdated = await Service.update(
            {
                id: parseInt(serviceId)
            },
            {
                service_name: service_name,
                description:description
            }
        )

        return res.status(200).json({
            success: true,
            message: "Service updated succesfully ",
            data: serviceUpdated
        })

    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: "Service can't be updated ",
            error: error
        })
    }
}
export const DeleteService = async (req: Request, res: Response) => {
    try {
        const serviceId = req.params.id;
        const serviceToRemove = await Service.findOneBy({
            
            id: parseInt(serviceId)
        })


        if (!serviceToRemove) {
            return res.status(400).json({
                success: false,
                message: "Service not found"
            })
        }
        const serviceIdRemoved = await Service.remove(serviceToRemove)
        return res.status(200).json({
            success: true,
            message: "Service deleted succesfully ",
            data: serviceIdRemoved
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Service can't be deleted ",
            error: error
        })
    }
}
