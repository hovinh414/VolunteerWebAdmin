import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    brand: {
      100: "#FF0035",
      200: "#FF0035",
      300: "#FF0035",
      400: "#FF0035",
      500: "#FF0035",
      600: "#FF0035",
      700: "#FF0035",
      800: "#FF0035",
      900: "#FF0035",
    },
    brandScheme: {
      100: "#FF0035",
      200: "#FF0035",
      300: "#FF0035",
      400: "#FF0035",
      500: "#FF0035",
      600: "#FF0035",
      700: "#FF0035",
      800: "#FF0035",
      900: "#FF0035",
    },
    brandTabs: {
      100: "#FF0035",
      200: "#FF0035",
      300: "#422AFB",
      400: "#422AFB",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#02044A",
    },
    secondaryGray: {
      100: "#E0E5F2",
      200: "#E1E9F8",
      300: "#F4F7FE",
      400: "#E9EDF7",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#1B2559",
    },
    red: {
      100: "#FF0035",
      500: "#FF0035",
      600: "#FF0035",
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF",
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: "#FF0035",
      100: "#FF0035",
      200: "#FF0035",
      300: "#728fea",
      400: "#3652ba",
      500: "#1b3bbb",
      600: "#24388a",
      700: "#1B254B",
      800: "#111c44",
      900: "#0b1437",
    },
    gray: {
      100: "#FAFCFE",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "DM Sans",
      },
    }),
  },
};
