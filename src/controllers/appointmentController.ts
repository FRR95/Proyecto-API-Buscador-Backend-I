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


        if (!appointment) {
            return res.status(500).json({
                success: false,
                message: "Appointment not found ",

            })
        }


        const appointmentUpdated = await Appointment.update(
            {
                id: parseInt(AppointmentId),

                user: {
                    id: UserId
                }
            },
            {
                appointment_date: appointment_date,
                service: { id: parseInt(ServiceId) },
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
                user: { id: UserId }
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
                user: { id: UserId }
            },
            relations: {
                service: true,
                user: true
            },
            select: {
                service: {
                    service_name: true
                },
                user: {
                    first_name: true
                }
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

export const DeleteUserAppointments = async (req: Request, res: Response) => {
    try {
        const appointmentId = req.params.id;
        const appointmentToRemove = await Appointment.findOneBy({

            id: parseInt(appointmentId)
        })

        if (!appointmentToRemove) {
            return res.status(400).json({
                success: false,
                message: "Appointment not found"
            })
        }

        const appointmentIdRemoved = await Appointment.remove(appointmentToRemove)
        return res.status(200).json({
            success: true,
            message: "Appointment deleted succesfully ",
            data: appointmentIdRemoved
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment can't be deleted ",
            error: error
        })
    }

}
export const GetUsersAppointments = async (req: Request, res: Response) => {
    try {

        const userId = req.params.id
        const getUserAppointments = await Appointment.find({

          where:{user:{id: parseInt(userId)}},
          relations: {
            service: true,
            user: true
        },
        select: {
            service: {
                service_name: true
            },
            user: {
                first_name: true
            }
        }

          
            

        })
        res.status(201).json({
            success: true,
            message: "Appointment´s user retrieved successfully ",
            data: getUserAppointments
        })

        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment´s user cant be retreived ",
            error: error
        })
    }

}