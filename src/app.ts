import express from "express";
import 'dotenv/config'
import { LogInService, SignInService } from "./controllers/authController";
import { DeleteUser, FilterUserInfo, GetUserInfo, GetUsers, UpdateUserInfo, UpdateUserRole } from "./controllers/userController";
import { GetUserAppointments, PostAppointment, RecoverAppointments, UpdateAppointment } from "./controllers/appointmentController";
import { DeleteService, GetServices, PostService, UpdateService } from "./controllers/serviceController";

export const app =express();

app.use(express.json());


// ROUTES 

//AUTH ROUTES
app.post('/api/auth/register',SignInService)
app.post('/api/auth/login',LogInService)

// USERS ROUTES
app.get('/api/users',GetUsers)
app.get('/api/users/profile',GetUserInfo)
app.put('/api/users/profile',UpdateUserInfo)
app.get('/api/users?email=ejemplo@ejemplo.com',FilterUserInfo)
app.delete('/api/users/:id',DeleteUser)
app.put('/api/users/:id/role',UpdateUserRole)

//APPOINTMENTS
app.post('/api/appointments',PostAppointment)
app.put('/api/appointments',UpdateAppointment)
app.get('/api/appointments/:id',RecoverAppointments)
app.get('/api/appointments/:id',GetUserAppointments)

//SERVICES
app.get('/api/services',GetServices)
app.post('/api/services',PostService)
app.put('/api/services/:id',UpdateService)
app.delete('/api/services/:id',DeleteService)



//TESTING 

// AUTH
app.post('/api/auth/register',SignInService)


// USERS
app.get('/api/user/profile/:id',GetUserInfo)
app.put('/api/user/profile/:id',UpdateUserInfo)
app.delete('/api/users/:id',DeleteUser)

// SERVICES
app.post('/api/services',PostService)
app.get('/api/services',GetServices)
app.put('/api/services/:id',UpdateService)
app.delete('/api/services/:id',DeleteService)
