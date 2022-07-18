import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { userRepository, CreateUserData } from "../repositories/userRepository";
dotenv.config();

const hash = 27;

async function registerUser(createUserData: CreateUserData) {
    createUserData.email = createUserData.email.toLowerCase();
    const email = createUserData.email;
    const password = createUserData.password;
    const isEmailRegistered = await userRepository.emailAlreadyUsed(email);
    if(isEmailRegistered){
        throw {
            type: "conflict",
            message: "there's already an account using this email..."
        }
    }
    createUserData.password = bcrypt.hashSync(password, hash);
    await userRepository.createUser(createUserData)
}


async function beginSession(createUserData: CreateUserData) {
    const user = await userRepository.emailAlreadyUsed(createUserData.email)
    if(!user){
        throw {
            type: "not_found",
            message: "User not registered!"
        }
    }
    if(!(bcrypt.compareSync(createUserData.password, user.password))){
        throw {
            type:"unauthorized", 
            message: "Incorrect password!"
        }
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({id: user.id, email: user.email}, secretKey);
   
    return token
}

export const userServices = {
    registerUser,
    beginSession
}

