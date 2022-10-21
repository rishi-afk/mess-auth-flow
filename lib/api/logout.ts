import { AUTH_CLIENT } from "../axios";

const logout = async (): Promise<boolean> => {
    await AUTH_CLIENT.post("/logout");
    return true;
};

export default logout;
