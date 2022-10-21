import React from "react";
import {
    Button,
    Flex,
    HStack,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import useUser from "../../lib/hooks/use-user";
import MobileNav from "./MobileNav";
import logout from "../../lib/api/logout";

interface Props {
    variant: "MOBILE" | "DESKTOP";
}

const Navigation: React.FC<Props> = ({ variant }) => {
    const { loggedOut, mutate, user } = useUser();
    const {
        isOpen: modalIsOpen,
        onClose: modalOnClose,
        onOpen: modalOnOpen,
    } = useDisclosure();
    return (
        <>
            <MobileNav
                isOpen={modalIsOpen}
                onClose={modalOnClose}
                isVisible={variant === "MOBILE"}
            />
            <Flex
                as="header"
                w="full"
                h={32}
                pos={{ base: "relative", lg: "fixed" }}
                top={0}
                left={0}
                zIndex={100}
                justify="space-between"
                align="center"
                fontWeight="semibold"
                color="brand.black300"
                _dark={{ color: "brand.white" }}
                fontSize="md"
                px="8"
            >
                <Text
                    as="a"
                    href="/"
                    fontSize="5xl"
                    letterSpacing="-0.3rem"
                    fontWeight="bold"
                    display={"flex"}
                    justifyContent={"left"}
                >
                    NITTMess
                </Text>
                <HStack
                    spacing="4"
                    align="center"
                    justify={"right"}
                    fontWeight="normal"
                    flex="1"
                >
                    {variant === "MOBILE" ||
                        (user && (
                            <Menu>
                                <MenuButton
                                    p="0"
                                    as={Button}
                                    bg="transparent"
                                    _hover={{ bg: "transparent" }}
                                    _active={{ bg: "transparent" }}
                                >
                                    {user.email}
                                </MenuButton>
                                <MenuList
                                    rounded={"sm"}
                                    _dark={{ bg: "brand.black200" }}
                                >
                                    <MenuItem
                                        _hover={{ bg: "brand.lightGray" }}
                                        _focus={{ bg: "brand.lightGray" }}
                                        _dark={{
                                            _hover: { bg: "brand.black300" },
                                            _focus: { bg: "brand.black300" },
                                        }}
                                        onClick={async () => {
                                            await logout();
                                            mutate(null);
                                        }}
                                    >
                                        Logout
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        ))}
                    {variant === "MOBILE" && !loggedOut && (
                        <IconButton
                            bg="transparent"
                            _hover={{ bg: "transparent" }}
                            _active={{ bg: "transparent" }}
                            color={"brand.black300"}
                            _dark={{ color: "brand.white" }}
                            variant="ghost"
                            aria-label="Open menu"
                            fontSize="xl"
                            icon={<FiMenu />}
                            onClick={() => {
                                modalOnOpen();
                            }}
                        />
                    )}
                </HStack>
            </Flex>
        </>
    );
};

export default Navigation;
