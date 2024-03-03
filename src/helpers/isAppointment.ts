import { Request, Response } from "express";
import { Service } from "../models/Service";

export const isAppointmentHelper =async (req:Request,res:Response)=>{
    const service_id = req.body.service_id;
    const service = await Service.findOneBy({
        id: parseInt(service_id)
    })
    if (!service) {
        return res.status(500).json({
            success: false,
            message: "Service not found ",

        })
    }
}