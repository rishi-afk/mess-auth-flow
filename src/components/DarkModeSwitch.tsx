import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export const DarkModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark";
    return (
        <IconButton
            position={"fixed"}
            bottom={8}
            left={8}
            icon={isDark ? <SunIcon /> : <MoonIcon />}
            aria-label="Toggle Theme"
            color="brand.white"
            bgColor="brand.gray"
            opacity={0.6}
            _hover={{ bgColor: "brand.darkGray" }}
            _dark={{
                bgColor: "brand.gray",
                _hover: { bgColor: "brand.darkGray", color: "brand.white" },
                color: "brand.darkGray",
            }}
            onClick={toggleColorMode}
        />
    );
};
