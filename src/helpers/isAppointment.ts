import { NextFunction, Request, Response } from "express";
import { Service } from "../models/Service";

export const isAppointmentHelper =async (req:Request,res:Response,next:NextFunction)=>{
    const service_id = req.body.service_id;
    const dateNow = new Date(Date.now());
    const dateTyped = new Date(req.body.appointment_date);
    const service = await Service.findOneBy({
        id: parseInt(service_id)
    })
    if (!service) {
        return res.status(500).json({
            success: false,
            message: "Service not found ",

        })
    }

    if (dateTyped.getTime() < dateNow.getTime()) {
        return res.status(500).json({
            success: false,
            message: "The Appointment must be the current date or after ",

        })
    }

    next()
}