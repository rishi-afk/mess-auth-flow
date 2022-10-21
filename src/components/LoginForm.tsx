import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    Icon,
    Input,
    Link,
    Spinner,
    Text,
    useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik } from "formik";
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import NextLink from "next/link";
import useUser from "../../lib/hooks/use-user";
import login from "../../lib/api/login";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Problemo! Invalid Webmail :(")
        .matches(/^\d+@nitt\.edu$/, "Problemo! Invalid Webmail :(")
        .required("Problemo! Webmail is required :("),
    password: Yup.string()
        .min(8, "Too short!")
        .max(64, "Too long!")
        .required("We promise your password will be safe with us ;D"),
});

interface Props {
    emailHelperText?: string;
}

const LoginForm: React.FC<Props> = ({ emailHelperText }: Props) => {
    const toast = useToast();
    const { mutate } = useUser();
    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={async (values) => {
                    const [user, error] = await login(values);
                    if (user) {
                        mutate();
                        return toast({
                            position: "bottom-right",
                            duration: 2500,
                            isClosable: true,
                            render: () => (
                                <Alert
                                    status="success"
                                    variant="subtle"
                                    fontSize="sm"
                                >
                                    <AlertIcon />
                                    <Box flex="1">
                                        <AlertTitle>
                                            Login Successful
                                        </AlertTitle>
                                        <AlertDescription display="block">
                                            Welcome to SoundsByAman
                                        </AlertDescription>
                                    </Box>
                                </Alert>
                            ),
                        });
                    }
                    toast({
                        position: "bottom-right",
                        duration: 2500,
                        isClosable: true,
                        render: () => (
                            <Alert
                                status="error"
                                variant="subtle"
                                fontSize="sm"
                            >
                                <AlertIcon />
                                <Box flex="1">
                                    <AlertTitle>Login Failed</AlertTitle>
                                    <AlertDescription display="block">
                                        {error}
                                    </AlertDescription>
                                </Box>
                            </Alert>
                        ),
                    });
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form
                        onSubmit={handleSubmit}
                        style={{ marginBottom: "52px" }}
                    >
                        <FormControl
                            id="email"
                            isRequired
                            mb="8"
                            color="brand.black300"
                            fontFamily="body"
                            fontWeight="normal"
                            isInvalid={!!errors.email && !!touched.email}
                        >
                            <FormLabel>Webmail</FormLabel>
                            <Input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                type="text"
                                size="lg"
                                border="1px solid #dadada"
                                errorBorderColor="brand.errorBorder"
                                outline="0"
                                rounded="none"
                                shadow="base"
                                _focus={{ outline: "none", shadow: "md" }}
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                            {!!errors.email || (
                                <FormHelperText color="brand.darkGray">
                                    {emailHelperText}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            id="password"
                            isRequired
                            mb="16"
                            color="brand.black300"
                            fontFamily="body"
                            fontWeight="normal"
                            isInvalid={!!errors.password && !!touched.password}
                        >
                            <FormLabel>Password</FormLabel>
                            <Input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                type="password"
                                size="lg"
                                border="1px solid #dadada"
                                errorBorderColor="brand.errorBorder"
                                outline="0"
                                rounded="none"
                                shadow="base"
                                _focus={{ outline: "none", shadow: "md" }}
                            />
                            <FormErrorMessage>
                                {errors.password}
                            </FormErrorMessage>
                        </FormControl>
                        <HStack spacing="8">
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                bg="brand.black300"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                textAlign="center"
                                verticalAlign="middle"
                                px="12"
                                py="7"
                                overflow="hidden"
                                color="brand.white"
                                rounded="sm"
                                fontSize="lg"
                                pos="relative"
                                willChange="color, background-color"
                                _hover={{
                                    color: "brand.almond",
                                    bgColor: "lighten(brand.black300, 30%)",
                                }}
                                _active={{
                                    color: "brand.almond",
                                    bgColor: "lighten(brand.black300, 30%)",
                                }}
                                role="group"
                            >
                                {isSubmitting && (
                                    <Spinner color="brand.almond" />
                                )}
                                {isSubmitting || (
                                    <Text
                                        as="span"
                                        pos="relative"
                                        transition="all 300ms ease-out"
                                        h="full"
                                        textAlign="center"
                                        verticalAlign="middle"
                                        willChange="transform"
                                        display="inline-flex"
                                        alignItems="center"
                                        _groupHover={{
                                            transform:
                                                "translate3d(-0.5rem, 0, 0)",
                                        }}
                                    >
                                        Let's Go
                                        <Icon
                                            as={HiArrowNarrowRight}
                                            color="brand.white"
                                            transition="all 300ms ease-out"
                                            willChange="color, opacity, right"
                                            pos="absolute"
                                            right={0}
                                            opacity={0}
                                            _groupHover={{
                                                color: "brand.almond",
                                                opacity: 1,
                                                right: "-2rem",
                                            }}
                                        />
                                    </Text>
                                )}
                            </Button>
                        </HStack>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;
