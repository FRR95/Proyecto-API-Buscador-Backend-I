
import { faker } from "@faker-js/faker";
import { Role } from "../../models/Role";
import { Service } from "../../models/Service";
import { User } from "../../models/User";
import { AppDataSource } from "../db";
import { Appointment } from "../../models/Appointment";


const serviceSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const service1 = new Service();
        service1.service_name = "Tatuajes personalizados"
        service1.description = "Los clientes tendrán la libertad de seleccionar motivos y diseños únicos, personalizando completamente su experiencia de tatuaje de acuerdo a sus preferencias y gustos."
        await service1.save();

        const service2 = new Service();
        service2.service_name = "Tatuajes del catálogo"
        service2.description = "Ofrecemos la realización de tatuajes basados en diseños predefinidos en nuestro catálogo. Los clientes pueden elegir entre una variedad de opciones estilizadas y probadas."
        await service2.save();

        const service3 = new Service();
        service3.service_name = "Restauración y rejuvenecimiento de trabajos"
        service3.description = "Nos especializamos en la restauración y rejuvenecimiento de tatuajes existentes.Nuestros expertos trabajan para mejorar y renovar tatuajes antiguos, devolviéndoles su vitalidad."
        await service3.save();

        const service4 = new Service();
        service4.service_name = "Colocación de piercings y dilatadores"
        service4.description = "Ofrecemos servicios profesionales para la colocación de piercings y dilatadores.Nuestro equipo garantiza procedimientos seguros y estilos variados para satisfacer las preferencias individuales de nuestros clientes."
        await service4.save();

        const service5 = new Service();
        service5.service_name = "Venta de piercings y otros artículos"
        service5.description = "Además de nuestros servicios de aplicación, ofrecemos una selección de piercings y otros artículos relacionados con el arte corporal. Los clientes pueden adquirir productos de calidad para complementar su estilo único."
        await service5.save();


        console.log("Se han guardado corectamente los datos de servicios")

    } catch (error) {
        console.log(error);
    } finally {
        await AppDataSource.destroy()
    }
}

const roleSeedDatabase = async () => {
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

const generateFakeUsers = () => {
    const NewUser = User.create({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password_hash: "$2b$08$oCmWUE5F7WHXqBaal2tpEOsXnrfdFx556wG4FEgiUPzIU75PppyOO",
        role: {
            id: faker.number.int({ min: 1, max: 3 })
        }
    })
    return NewUser;
}
const userSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();
        const fakeUsers = Array.from({ length: 10 }, generateFakeUsers);
        await User.save(fakeUsers);
        await AppDataSource.destroy()

        console.log("Se han guardado corectamente los datos de usuarios")
    }
    catch (error) {
        console.log(error);
    } 
    // finally {
    //     await AppDataSource.destroy()
    // }
}

const generateFakeAppointments = () => {
    const NewAppointment = Appointment.create({
        appointment_date: faker.date.future(),
        user: { id: faker.number.int({ min: 1, max: 10 }) },
        service: { id: faker.number.int({ min: 1, max: 5 }) },
    })
    return NewAppointment;
}
const appointmentSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();
        const fakeAppointments = Array.from({ length: 10 }, generateFakeAppointments);
        await Appointment.save(fakeAppointments);
        await AppDataSource.destroy()

        console.log("Se han guardado corectamente los datos de citas")
    }
    catch (error) {
        console.log(error);
    } finally {
        await AppDataSource.destroy()
    }
}

const executeSeeders = async () => {
    await serviceSeedDatabase();
    await roleSeedDatabase();
    await userSeedDatabase();
    await appointmentSeedDatabase();
}
executeSeeders();