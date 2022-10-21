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
    Text,
    useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik } from "formik";
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import useUser from "../../lib/hooks/use-user";
import register from "../../lib/api/register";

const RegisterSchema = Yup.object({
    email: Yup.string()
        .email("Problemo! Invalid Webmail :(")
        .matches(/^\d+@nitt\.edu$/, "Problemo! Invalid Webmail :(")
        .required("Problemo! Webmail is required :("),
    password: Yup.string()
        .min(8, "Too short!")
        .max(64, "Too long!")
        .required("We promise your password will be safe with us ;D"),
    name: Yup.string().optional(),
});

interface Props {
    emailHelperText?: string;
}

const RegisterForm: React.FC<Props> = ({ emailHelperText }) => {
    const toast = useToast();
    const { mutate } = useUser();
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                name: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={async (values) => {
                const [_, error] = await register({
                    email: values.email,
                    password: values.password,
                    name: values.name || undefined,
                });
                if (error)
                    return toast({
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
                                    <AlertTitle>Sign Up Failed</AlertTitle>
                                    <AlertDescription display="block">
                                        {error === "Account already exists"
                                            ? "Looks like this account already exists. Try logging in instead."
                                            : error}
                                    </AlertDescription>
                                </Box>
                            </Alert>
                        ),
                    });
                mutate();
                toast({
                    position: "bottom-right",
                    duration: 2500,
                    isClosable: true,
                    render: () => (
                        <Alert status="success" variant="subtle" fontSize="sm">
                            <AlertIcon />
                            <Box flex="1">
                                <AlertTitle>Sign up completed</AlertTitle>
                                <AlertDescription display="block">
                                    Welcome
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
                <form onSubmit={handleSubmit}>
                    <FormControl
                        id="name"
                        mb="8"
                        color="brand.black300"
                        fontFamily="body"
                        fontWeight="normal"
                        isInvalid={!!errors.name && !!touched.name}
                    >
                        <FormLabel>Name</FormLabel>
                        <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            type="text"
                            size="lg"
                            border="1px solid #dadada"
                            errorBorderColor="brand.errorBorder"
                            outline="0"
                            rounded="none"
                            shadow="base"
                            _focus={{ outline: "none", shadow: "md" }}
                        />
                    </FormControl>
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
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <HStack spacing="8">
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            bg="brand.black300"
                            display="inline-block"
                            textAlign="center"
                            verticalAlign="middle"
                            w="180px"
                            overflow="hidden"
                            h="52px"
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
                                    transform: "translate3d(-0.5rem, 0, 0)",
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
                        </Button>
                    </HStack>
                </form>
            )}
        </Formik>
    );
};

export default RegisterForm;
