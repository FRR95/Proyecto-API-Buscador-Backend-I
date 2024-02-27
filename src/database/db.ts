import "reflect-metadata"
import 'dotenv/config'
import { DataSource } from "typeorm"
import { Services1708971480331 } from "./migrations/1708971480331-services"
import { Roles1708971996264 } from "./migrations/1708971996264-roles"
import { Users1708972302419 } from "./migrations/1708972302419-users"
import { Appointments1708973379930 } from "./migrations/1708973379930-appointments"
import { Test1708977353468 } from "./migrations/1708977353468-test"
import { Role } from "../models/Role"
import { User } from "../models/User"
import { Appointment } from "../models/Appointment"
import { Service } from "../models/Service"



export const AppDataSource = new DataSource({
type: "mysql",
host:process.env.DB_HOST|| "localhost",
port:Number(process.env.DB_PORT)|| 3307,
username:process.env.DB_USER|| "root",
password:process.env.DB_PASSWORD|| "1234",
database:process.env.DB_DATABASE|| "tattooAndPiercingShop",
entities: [Role,User,Appointment,Service],
migrations:[Services1708971480331,Roles1708971996264,Users1708972302419,Appointments1708973379930,Test1708977353468],
synchronize: false,
logging: false,
})