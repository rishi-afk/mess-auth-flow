import { ChakraProvider } from "@chakra-ui/react";
import "../styles/fonts";
import { AppProps } from "next/app";
import PrivateRoute from "../components/PrivateRoute";
import theme from "../definitions/chakra/theme";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <PrivateRoute>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </PrivateRoute>
    );
}

export default MyApp;
