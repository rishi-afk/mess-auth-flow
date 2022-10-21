import { PrismaClient } from "@prisma/client";
import { LoginRequestParams, RegisterRequestParams, User } from "../types";
import argon2 from "argon2";
const db = new PrismaClient();

export const findUser = async ({
    email,
    password,
}: LoginRequestParams): Promise<User | undefined> => {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return undefined;
    const verified = await argon2.verify(user.password, password);
    if (!verified) return undefined;
    return { email: user.email, name: user.name, id: user.id };
};

export const userExists = async ({ email }): Promise<boolean> => {
    const user = await db.user.findUnique({ where: { email } });
    if (user) return true;
    return false;
};

export const createUser = async ({
    email,
    name,
    password,
}: RegisterRequestParams): Promise<User> => {
    const hash = await argon2.hash(password);
    const user = await db.user.create({
        data: { email, password: hash, name },
    });
    return user;
};
