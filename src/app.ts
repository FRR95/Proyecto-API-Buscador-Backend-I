import express from "express";
import 'dotenv/config'
import { LogInService, SignInService } from "./controllers/authController";
import { DeleteUser, FilterUserInfo, GetUserInfo, GetUsers, UpdateUserInfo, UpdateUserRole } from "./controllers/userController";
import { GetUserAppointments, PostAppointment, RecoverAppointments, UpdateAppointment } from "./controllers/appointmentController";
import { DeleteService, GetServices, PostService, UpdateService } from "./controllers/serviceController";
import  {auth}  from "./middlewares/auth";
import { isSuperAdmin } from "./middlewares/isSuperAdmin";

export const app =express();

app.use(express.json());


// ROUTES 

//AUTH ROUTES
app.post('/api/auth/register',SignInService)
app.post('/api/auth/login',LogInService)

// USERS ROUTES
app.get('/api/users',auth,isSuperAdmin,GetUsers)
app.get('/api/user/profile',auth,GetUserInfo)
app.put('/api/user/profile',auth,UpdateUserInfo)
app.delete('/api/users/:id',auth,isSuperAdmin ,DeleteUser)
app.put('/api/users/:id/role',auth,isSuperAdmin ,UpdateUserRole)
app.get('/api/users?email=ejemplo@ejemplo.com',FilterUserInfo)


//APPOINTMENTS
app.post('/api/appointments',PostAppointment)
app.put('/api/appointments',UpdateAppointment)
app.get('/api/appointments/:id',RecoverAppointments)
app.get('/api/appointments/:id',GetUserAppointments)

//SERVICES
app.get('/api/services',GetServices)
app.post('/api/services',PostService)
app.put('/api/services/:id',auth,isSuperAdmin,UpdateService)
app.delete('/api/services/:id',auth,isSuperAdmin,DeleteService)



//TESTING 







