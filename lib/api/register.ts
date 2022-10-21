import axios from "axios";
import { AUTH_CLIENT } from "../../lib/axios";
import { RegisterRequestParams, User } from "../../lib/types";

const register = async (
    request: RegisterRequestParams
): Promise<[User | undefined, string | undefined]> => {
    try {
        const response = await AUTH_CLIENT.post("/register", request);
        const user: User = response.data;
        return [user, undefined];
    } catch (error) {
        if (axios.isAxiosError(error))
            return [undefined, error.response?.data?.message || error.message];
        return [undefined, "Looks like our servers are down :("];
    }
};

export default register;
