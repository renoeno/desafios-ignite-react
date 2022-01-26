import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#1F2029",
      "800": "#353646",
      "700": "#47585B",
      "600": "#616480",
      "500": "#797D9A",
      "400": "#999999",
      "300": "#C4C4C4",
      "200": "#DADADA",
      "100": "#EEEEF2",
      "50": "#F5F8FA",
    },
    yellow: {
      "500": "#FFBA08",
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    continent: "Barlow",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.600",
      },
    },
  },
});
