import { extendTheme, theme as chakraTheme} from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        primary: chakraTheme.colors.purple,
      },
      components: {
        Input: {
          defaultProps: {
            focusBorderColor: "primary.500",
          },
        },
      },
});

export default theme;
