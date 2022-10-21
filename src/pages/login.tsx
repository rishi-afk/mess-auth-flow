import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    GridItem,
    Heading,
    Link,
    Text,
    useBreakpointValue,
    useColorMode,
    useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useUser from "../../lib/hooks/use-user";
import GridContainer from "../components/GridContainer";
import LoginForm from "../components/LoginForm";
import Navigation from "../components/Navigation";
import NextLink from "next/link";
import Loader from "../components/Loader";

const Login = () => {
    const variant = useBreakpointValue({ base: "MOBILE", lg: "DESKTOP" }) as
        | "MOBILE"
        | "DESKTOP";
    const { user, loggedOut, loading } = useUser();
    const { setColorMode } = useColorMode();
    const toast = useToast();
    const router = useRouter();
    useEffect(() => {
        if (user && !loggedOut) {
            router.replace("/");
        }
    }, [user, loggedOut]);
    useEffect(() => {
        setColorMode("light");
    }, []);
    useEffect(() => {
        if (router.isReady) {
            const unauthorized = router?.query?.unauthorized;
            if (unauthorized === "true") {
                toast({
                    position: "bottom-right",
                    duration: 2500,
                    isClosable: true,
                    render: () => (
                        <Alert status="error" variant="subtle" fontSize="sm">
                            <AlertIcon />
                            <Box flex="1">
                                <AlertTitle>Unauthorized</AlertTitle>
                                <AlertDescription display="block">
                                    You don't have permissions to access the
                                    requested resource.
                                </AlertDescription>
                            </Box>
                        </Alert>
                    ),
                });
            }
        }
    }, [router.isReady]);
    return loading === true ? (
        <Loader />
    ) : (
        <>
            <Head>
                <title>Login | Mess @ NITT</title>
            </Head>
            <Navigation variant={variant} />
            <Box as="main" pos="relative" width="full" left="0">
                <GridContainer
                    gridProps={{
                        h: "100vh",
                        gridTemplateRows: "64px minmax(min-content, 1fr) 128px",
                        bgColor: "brand.white",
                    }}
                >
                    <GridItem
                        colStart={{ base: 2, lg: 2 }}
                        colEnd={{ base: 6, lg: 5 }}
                        rowStart={{ base: 2, lg: 2 }}
                        rowEnd={{ base: 2, lg: 3 }}
                        alignSelf={{ base: "start", lg: "center" }}
                    >
                        <Heading
                            size="h3"
                            as="h1"
                            mb="52px"
                            letterSpacing="tighter"
                        >
                            Login
                        </Heading>
                        <LoginForm emailHelperText="Eg. 205122120@nitt.edu" />
                    </GridItem>
                    {variant === "DESKTOP" && (
                        <GridItem
                            colStart={{ base: 2, lg: 6 }}
                            colEnd={{ base: 6, lg: -1 }}
                            h="full"
                            rowStart={{ base: 3, lg: 1 }}
                            rowEnd={{ base: 4, lg: -1 }}
                            pos="relative"
                            bgImage={"bg.jpg"}
                        />
                    )}
                    <GridItem
                        colStart={{ base: 2, lg: 2 }}
                        colEnd={{ base: 6, lg: 5 }}
                        rowStart={{ base: 3, lg: 3 }}
                    >
                        <Text
                            fontSize="lg"
                            color="brand.black300"
                            fontWeight="normal"
                            cursor="default"
                        >
                            Don't have an account?{" "}
                            <NextLink href="/register" passHref>
                                <Link fontWeight="semibold">Register</Link>
                            </NextLink>
                        </Text>
                    </GridItem>
                </GridContainer>
            </Box>
        </>
    );
};

export default Login;
