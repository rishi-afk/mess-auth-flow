import { Flex, Heading } from "@chakra-ui/react";

interface Props {
    text?: string;
}

export const Hero = ({ text = "Welcome" }: Props) => (
    <Flex
        justifyContent="center"
        alignItems="center"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        w="full"
        px="8"
        h="100vh"
        mt={{ base: -32, lg: 0 }}
    >
        <Heading
            fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
            color={"transparent"}
            lineHeight="1.2"
        >
            {text}
            <br /> You have been alloted MMII First Floor.
        </Heading>
    </Flex>
);
