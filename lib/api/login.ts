import axios from "axios";
import { AUTH_CLIENT } from "../../lib/axios";
import { LoginRequestParams, User } from "../../lib/types";

const login = async (
    request: LoginRequestParams
): Promise<[User | undefined, string | undefined]> => {
    try {
        const response = await AUTH_CLIENT.post("/login", request);
        const data = <User>response.data;
        return [data, undefined];
    } catch (error) {
        if (axios.isAxiosError(error))
            return [undefined, error.response?.data?.message || error.message];
        return [undefined, "Looks like our servers are down :("];
    }
};

export default login;
