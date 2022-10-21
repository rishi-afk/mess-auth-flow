import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import useUser from "../../lib/hooks/use-user";
import Loader from "./Loader";

interface Props {
    protectedRoutes?: string[];
    children?: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const { loading, loggedOut } = useUser();
    const pathIsProtected = router.pathname === "/";
    useEffect(() => {
        if (!loading && loggedOut && pathIsProtected) {
            router.replace("/login");
        }
    }, [loading, loggedOut, pathIsProtected]);
    if ((loading || loggedOut) && pathIsProtected) {
        return <Loader />;
    }
    return <>{children}</>;
};

export default PrivateRoute;
