import {
    Box,
    Container,
    Flex,
    GridItem,
    Heading,
    useBreakpointValue,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import useUser from "../../lib/hooks/use-user";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import Navigation from "../components/Navigation";

const Dashboard = () => {
    const variant = useBreakpointValue({ base: "MOBILE", lg: "DESKTOP" }) as
        | "MOBILE"
        | "DESKTOP";
    const { user } = useUser();
    return (
        <>
            <Head>
                <title>Dashboard | Mess @ NITT</title>
            </Head>
            <Box w="full" _dark={{ bgColor: "brand.black100" }}>
                <Navigation variant={variant} />
                <Hero
                    text={`Welcome, ${user.name || user.email.split("@")[0]}!`}
                />
                <DarkModeSwitch />
            </Box>
        </>
    );
};

export default Dashboard;
