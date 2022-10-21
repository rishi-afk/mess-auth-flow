import {
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Modal,
    VStack,
    ModalFooter,
    Link,
    Button,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import useUser from "../../lib/hooks/use-user";
import logout from "../../lib/api/logout";
import { useRouter } from "next/router";
interface Props {
    onClose: () => void;
    isOpen: boolean;
    isVisible: boolean;
}

const MobileNav: React.FC<Props> = ({ isOpen, onClose, isVisible }) => {
    const { loggedOut, mutate } = useUser();
    const router = useRouter();
    if (isVisible)
        return (
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                size="full"
                blockScrollOnMount={true}
            >
                <ModalContent
                    bgColor="#FFFFFFA6"
                    backdropFilter="blur(12px)"
                    rounded="none"
                    _dark={{ bgColor: "brand.black200" }}
                >
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton size="lg" top={10} right={5} />
                    <ModalBody px="8" py="2">
                        <VStack
                            align="start"
                            fontFamily="body"
                            fontWeight="bold"
                            color="brand.black300"
                            fontSize="3xl"
                            letterSpacing="tighter"
                            lineHeight="short"
                        >
                            {!loggedOut && (
                                <Button
                                    variant={"link"}
                                    fontFamily="body"
                                    fontWeight="bold"
                                    color="brand.black300"
                                    fontSize="3xl"
                                    _dark={{ color: "brand.white" }}
                                    letterSpacing="tighter"
                                    lineHeight="short"
                                    onClick={async () => {
                                        await logout();
                                        mutate(null);
                                    }}
                                >
                                    Logout
                                </Button>
                            )}
                        </VStack>
                    </ModalBody>
                    <ModalFooter justifyContent="flex-start">
                        Mess @ NITT V2.0.1
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    else return <></>;
};

export default MobileNav;
