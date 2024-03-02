import { User } from "../../models/User";
import { AppDataSource } from "../db";
import { faker } from '@faker-js/faker';


const generateFakeUsers = () => {
const NewUser =User.create({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password_hash: "$2b$08$oCmWUE5F7WHXqBaal2tpEOsXnrfdFx556wG4FEgiUPzIU75PppyOO",
    role: {
        id: faker.number.int({ min: 1, max:3 })
    }
})
return NewUser;
}
const userSeedDatabase = async() => {
    try {
    await AppDataSource.initialize();
    const fakeUsers = Array.from({ length: 10 }, generateFakeUsers);
    await User.save(fakeUsers);
    await AppDataSource.destroy()
    
    console.log("Se han guardado corectamente los datos de usuarios")
    } 
    catch (error) {
    console.log(error);
    } finally {
    await AppDataSource.destroy()
    }
    }
    userSeedDatabase();