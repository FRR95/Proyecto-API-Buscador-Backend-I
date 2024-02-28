import express from "express";
import 'dotenv/config'
import { DeleteService, DeleteUser, FilterUserInfo, GetHealthy, GetServices, GetUserAppointments, GetUserInfo, GetUsers, LogInService, PostAppointment, PostService, RecoverAppointments, SignInService, UpdateAppointment, UpdateService, UpdateUserInfo, UpdateUserRole } from "./controllers/roleController"; 

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
app.post('/api/services/:id',UpdateService)
app.delete('/api/services/:id',DeleteService)