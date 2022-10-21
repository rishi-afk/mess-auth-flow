const Heading = {
    baseStyle: {
        fontFamily: "body",
        color: "brand.black300",
    },
    sizes: {
        h1: {
            fontSize: {
                base: "4xl",
                sm: "5xl",
                md: "6xl",
                lg: "7xl",
                xl: "8xl",
                "2xl": "9xl",
            },
            fontWeight: "bold",
            lineHeight: "none",
            letterSpacing: "tighter",
        },
        h2: {
            fontSize: {
                base: "5xl",
                lg: "6xl",
                xl: "7xl",
            },
            fontWeight: "bold",
            lineHeight: "none",
        },
        h3: {
            fontSize: {
                base: "4xl",
                md: "5xl",
                xl: "6xl",
            },
            fontWeight: "bold",
            lineHeight: "none",
        },
        h4: {
            fontSize: {
                base: "3xl",
                sm: "4xl",
                md: "5xl",
                xl: "6xl",
            },
            fontWeight: "bold",
            lineHeight: "none",
        },
        h5: {
            fontSize: {
                base: "2xl",
                sm: "3xl",
                md: "4xl",
                lg: "5xl",
            },
            fontWeight: "normal",
            lineHeight: "none",
        },
        h6: {
            fontSize: "2xl",
            fontWeight: "normal",
            lineHeight: "shorter",
        },
    },
    defaultProps: {
        size: "h2",
    },
};

export default Heading;
