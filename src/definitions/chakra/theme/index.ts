import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";
import colors from "./foundations/colors";
import breakpoints from "./foundations/breakpoints";
import fontSizes from "./foundations/font-sizes";
import lineHeights from "./foundations/line-heights";
import Heading from "./foundations/heading";
import Text from "./foundations/text";
import Container from "./foundations/container";
const fonts = {
    mono: `'Roboto Mono', monospace`,
    body: "Manrope",
    display: "Bebas Neue",
};

const overrides = {
    ...styles,
    colors,
    fontSizes,
    fonts,
    breakpoints,
    lineHeights,
    components: {
        Heading,
        Text,
        Container,
    },
};

const theme = extendTheme(overrides);

export default theme;
