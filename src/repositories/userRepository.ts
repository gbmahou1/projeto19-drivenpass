import { User } from "@prisma/client";
import prisma from "../db/db";

export type CreateUserData = Omit<User, "id" | "create_at">

async function createUser(createUserData: CreateUserData) {
    await prisma.user.create({data: createUserData})
}

async function emailAlreadyUsed(email: string) {
    const emailAlreadyUsed = await prisma.user.findUnique({where: {email}})
    return emailAlreadyUsed
}

export const userRepository = {
    createUser,
    emailAlreadyUsed
}

