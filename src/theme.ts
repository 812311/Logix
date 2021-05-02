import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  colors: {
    header: {
      bg: {
        light: "#333333",
        dark: "#a0a0a0",
      },
      font: {
        dark: "#ffffff",
        light: "#ffffffeb",
      },
      hover: {
        light: "#09cfbf",
        dark: "#ffffffeb",
      },
    },
    login: {
      bg: {
        light: "#333333",
        dark: "#a0a0a0",
      },
    },
  },
  fonts: {
    heading: "Titillium Web",
    body: "Titillium Web",
  },
  components: {
    Link: {
      variants: {
        // @ts-ignore
        header: ({ colorMode }) => ({
          color: `header.font.${colorMode}`,
          _hover: {
            color: `header.hover.${colorMode}`,
            textDecoration: "none",
          },
        }),
        // @ts-ignore
        login: ({ colorMode }) => ({
          _hover: {
            color: `header.hover.${colorMode}`,
            textDecoration: "none",
          },
        }),
      },
    },
    Text: {
      variants: {
        // @ts-ignore
        header: ({ colorMode }) => ({
          color: `header.font.${colorMode}`,
          _hover: {
            color: `header.hover.${colorMode}`,
            textDecoration: "none",
            cursor: "pointer",
          },
        }),
        // @ts-ignore
        login: ({ colorMode }) => ({
          _hover: {
            cursor: "pointer",
            color: `header.hover.${colorMode}`,
            textDecoration: "none",
          },
        }),
      },
    },
    Button: {
      // @ts-ignore
      login: ({ colorMode }) => ({
        _hover: {
          backgroundColor: `header.hover.${colorMode}`,
        },
      }),
      // @ts-ignore
      table: ({ colorMode }) => ({
        borderColor: {
          backgroundColor: `header.bg.${colorMode}`,
        },
      }),
    },
  },
  global: (props: any) => ({
    body: {
      fontFamily: "body",
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("white", "gray.800")(props),
      lineHeight: "base",
    },
  }),
});
