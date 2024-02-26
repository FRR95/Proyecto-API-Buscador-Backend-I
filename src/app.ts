import express from "express";
import 'dotenv/config'
// import { GetHealthy } from "./controllers/roleController"; 

export const app =express();

app.use(express.json());


// roles routes
// app.get('/healthy',GetHealthy)