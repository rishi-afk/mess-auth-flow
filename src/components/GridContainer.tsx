import { Grid, GridProps } from "@chakra-ui/react";
import React from "react";

type Props = {
    gridProps?: GridProps;
    children?: React.ReactNode;
};

const GridContainer: React.FC<Props> = ({ children, gridProps }) => {
    return (
        <Grid
            gridColumnGap={{ base: 4, lg: 8 }}
            gridTemplateColumns={{
                base: "1rem repeat(4, 1fr) 1rem",
                lg: "repeat(14, 1fr)",
            }}
            {...gridProps}
        >
            {children}
        </Grid>
    );
};

export default GridContainer;
