import { AUTH_CLIENT } from "../axios";
import { User } from "../types";

const me = async (): Promise<User> => {
    const response = await AUTH_CLIENT.get(`/me`);
    const user = response.data;
    return user;
};

export default me;
