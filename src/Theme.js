import { extendTheme, theme as chakraTheme} from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
    colors: {
        primary: chakraTheme.colors.teal,
      },
      components: {
        Input: {
          defaultProps: {
            focusBorderColor: "primary.300"
          },
        },
      },
});

export default theme;
