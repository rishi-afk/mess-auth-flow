import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const Loader: React.FC = () => {
    return (
        <Flex h="100vh" w="full" justify="center" align="center">
            <Spinner size="xl" />
        </Flex>
    );
};

export default Loader;
