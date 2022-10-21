import { IronSessionOptions } from "iron-session";
import { User } from "./types";

const password =
    process.env.COOKIE_SECRET_KEY ||
    "WXVvrz6P9+3sC3uQ7PdV7OzQ9XrpPf/Trp40Vz6XMp4=";

declare module "iron-session" {
    interface IronSessionData {
        user?: User;
    }
}

export const options: IronSessionOptions = {
    cookieName: "mess-auth",
    password,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};
