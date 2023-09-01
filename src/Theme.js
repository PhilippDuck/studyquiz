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
      fonts: {
        body: "Calibri, Arial, sans-serif", // Calibri als erste Wahl, gefolgt von Arial und dann einer generischen sans-serif Schriftart
        heading: "Calibri, Arial, sans-serif", // Gleiches Prinzip für Überschriften
      },
});

export default theme;
