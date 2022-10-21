import axios from "axios";

const baseURL =
    process.env.NEXT_PUBLIC_AUTH_SERVICE_BASE_URL ||
    "http://localhost:3000/api";
export const AUTH_CLIENT = axios.create({ baseURL, withCredentials: true });
