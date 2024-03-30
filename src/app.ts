import express from "express";
import 'dotenv/config'
import { LogInService, SignInService } from "./controllers/authController";
import { DeleteUser, FilterUserInfo, GetUserInfo, GetUsers, GetUsersProfile, UpdateUserInfo, UpdateUserInfoById, UpdateUserRole } from "./controllers/userController";
import { DeleteUserAppointments, GetUserAppointments, GetUsersAppointments, PostAppointment, RecoverAppointments, UpdateAppointment } from "./controllers/appointmentController";
import { DeleteService, GetServices, PostService, UpdateService } from "./controllers/serviceController";
import  {auth}  from "./middlewares/auth";
import { isSuperAdmin } from "./middlewares/isSuperAdmin";
import { isAppointmentHelper } from "./helpers/isAppointment";
import { isEmailAndPasswordHelper } from "./helpers/isEmailAndPassword";
import cors from "cors"


export const app =express();

app.use(express.json());
app.use(cors());


// ROUTES 

//AUTH ROUTES
app.post('/api/auth/register',isEmailAndPasswordHelper,SignInService)
app.post('/api/auth/login',isEmailAndPasswordHelper,LogInService)

// USERS ROUTES
app.get('/api/users/:id',auth,isSuperAdmin,GetUsersProfile)
app.get('/api/users',auth,isSuperAdmin,GetUsers)
app.get('/api/user/profile',auth,GetUserInfo)
app.put('/api/user/profile',auth,UpdateUserInfo)
app.delete('/api/users/:id',auth,isSuperAdmin ,DeleteUser)
app.put('/api/users/:id',auth,isSuperAdmin ,UpdateUserInfoById)
app.put('/api/users/:id/role',auth,isSuperAdmin ,UpdateUserRole)



//APPOINTMENTS
app.post('/api/appointments',auth,isAppointmentHelper,PostAppointment)
app.put('/api/appointments',auth,isAppointmentHelper,UpdateAppointment)
app.get('/api/appointments/:id',auth,RecoverAppointments)
app.get('/api/appointments',auth,GetUserAppointments)
app.delete('/api/appointments/:id',auth,DeleteUserAppointments)
app.get('/api/:id/appointments',auth,isSuperAdmin,GetUsersAppointments)

//SERVICES
app.get('/api/services',GetServices)
app.post('/api/services',auth,isSuperAdmin,PostService)
app.put('/api/services/:id',auth,isSuperAdmin,UpdateService)
app.delete('/api/services/:id',auth,isSuperAdmin,DeleteService)










