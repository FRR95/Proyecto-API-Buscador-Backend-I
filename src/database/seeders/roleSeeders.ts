import { Role } from "../../models/Role";
import { AppDataSource } from "../db";
import { faker } from '@faker-js/faker';

const roleSeedDatabase = async() => {
    try {
    await AppDataSource.initialize();

    const roleUser = new Role();
    roleUser.name = "user"
    await roleUser.save();

    const roleAdmin = new Role();
    roleAdmin.name = "admin"
    await roleAdmin.save();

    const roleSuperAdmin = new Role();
    roleSuperAdmin.name = "super_admin"
    await roleSuperAdmin.save();
    
    console.log("Se han guardado corectamente los roles")
    } catch (error) {
    console.log(error);
    } finally {
    await AppDataSource.destroy()
    }
    }
    roleSeedDatabase();