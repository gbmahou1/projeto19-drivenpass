import { Request, Response } from "express";
import { CreateUserData } from "../repositories/userRepository";
import { userServices } from "../services/userServices";

export async function registerUser(req: Request, res: Response){
    const userInfo: CreateUserData = req.body;
    await userServices.registerUser(userInfo);
    res.sendStatus(201);
}

export async function beginSession(req: Request, res: Response) {
    const userInfo: CreateUserData = req.body; 
    const token = await userServices.beginSession(userInfo);
    res.status(200).send(token);
}