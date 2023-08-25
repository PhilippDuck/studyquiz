import { extendTheme, theme as chakraTheme} from "@chakra-ui/react";




const theme = extendTheme({
    colors: {
        primary: chakraTheme.colors.teal,
      },
      components: {
        Input: {
          defaultProps: {
            focusBorderColor: "primary.300"
          },
        }
      },
});

export default theme;
