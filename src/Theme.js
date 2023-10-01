import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#F7EDF7",
      100: "#E9CDE9",
      200: "#DBADDC",
      300: "#CC8DCE",
      400: "#BE6DC0",
      500: "#B04DB2",
      600: "#8D3E8E",
      700: "#6A2E6B",
      800: "#461F47",
      900: "#230F24",
    },
    gray: {
      50: "#EEEEF6",
      100: "#CFCFE7",
      200: "#B1B1D8",
      300: "#9292C9",
      400: "#7474B9",
      500: "#5555AA",
      600: "#444488",
      700: "#333366",
      800: "#222244",
      900: "#111122",
    },
  },
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: "primary.300",
      },
    },
    Textarea: {
      variants: {
        outline: {
          _focus: {
            borderColor: "primary.300", // Wählen Sie Ihre gewünschte Farbe
            boxShadow: "0 0 0 2px primary.300", // Einstellen des Schattens, um den Fokus hervorzuheben.
            borderWidth: "2px",
          },
        },
      },
    },
  },
  fonts: {
    body: "Calibri, Arial, sans-serif", // Calibri als erste Wahl, gefolgt von Arial und dann einer generischen sans-serif Schriftart
    heading: "Calibri, Arial, sans-serif", // Gleiches Prinzip für Überschriften
  },
});

export default theme;
