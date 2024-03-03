import { Request, Response, application } from "express"
import { Appointment } from "../models/Appointment";
import { Service } from "../models/Service";
import { isAppointmentHelper } from "../helpers/isAppointment";

//APPOINTMENTS

export const PostAppointment = async (req: Request, res: Response) => {
    try {
        const appointment_date = req.body.appointment_date;
        const user_id = req.tokenData.userId;
        const service_id = req.body.service_id;
        const dateNow=new Date(Date.now());
        const dateTyped=new Date(req.body.appointment_date);


        const service = await Service.findOneBy({
            id: parseInt(service_id)
        })

        if (!service) {
            return res.status(500).json({
                success: false,
                message: "Service not found ",

            })
        }
        //todo validar fecha 
        if (dateTyped.getTime()<dateNow.getTime()) {
            return res.status(500).json({
                 success: false,
                 message: "The Appointment must be the current date or after ",

             })
         }

        const NewAppointment = await Appointment.create({
            appointment_date: appointment_date,
            user: {
                id: user_id
            },
            service: {
                id: parseInt(service_id)
            }

        }).save()

        return res.status(201).json({
            success: true,
            message: "Appointment posted succesfully ",
            data: NewAppointment

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment can't be posted ",
            error: error
        })
    }
}
export const UpdateAppointment = async (req: Request, res: Response) => {
    try {
        const AppointmentId = req.body.id;
        const UserId = req.tokenData.userId;
        const appointment_date = req.body.appointment_date;
        const ServiceId = req.body.service_id


        const appointment = await Appointment.findOneBy({
            id: parseInt(AppointmentId)
        })

        // if (appointment_date<Date.now()) {
        //    return res.status(500).json({
        //         success: false,
        //         message: "The Appointment must be the current date or after ",

        //     })
        // }
        if (!appointment) {
            return res.status(500).json({
                success: false,
                message: "Appointment not found ",

            })
        }
        const appointmentUpdated = await Appointment.update(
            {
                id: parseInt(AppointmentId),

                user:{
                id:UserId
            } 
            },
            {
                appointment_date: appointment_date,
                service:{id: parseInt(ServiceId)},
            },

        )

        return res.status(200).json({
            success: true,
            message: "Appointment updated succesfully ",
            data: appointmentUpdated
        })

    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment can't be updated ",
            error: error
        })
    }
}
export const RecoverAppointments = async (req: Request, res: Response) => {
    try {
        const AppointmentId = req.params.id;
        const UserId = req.tokenData.userId;

        const appointment = await Appointment.findOneBy({
            id: parseInt(AppointmentId)
        })

        if (!appointment) {
            return res.status(400).json({
                success: false,
                message: "Appointment not found "
            })
        }
        const users = await Appointment.find({
            where: {
                id: parseInt(AppointmentId),
                user:{id:UserId} 
            }
        })
        res.status(201).json({
            success: true,
            message: "Appointment retrieved succesfully ",
            data: users

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment can't be recovered ",
            error: error
        })
    }
}
export const GetUserAppointments = async (req: Request, res: Response) => {
    try {
        const UserId = req.tokenData.userId;
        const appointment = await Appointment.find({
            where: {
                user:{id: UserId}
            }
        })
        res.status(200).json({
            success: true,
            message: "Services retrieved succesfully ",
            data: appointment

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