import useSWR from "swr";
import me from "../api/me";
import { User } from "../types";

const useUser = () => {
    const { data, mutate, error } = useSWR<User>("me", me, {
        shouldRetryOnError: false,
    });
    const loading = !data && !error;
    const loggedOut = error;
    return {
        loading,
        loggedOut,
        user: data,
        mutate,
    };
};

export default useUser;
