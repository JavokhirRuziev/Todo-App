import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#d63333",
    },
    secondary: {
      main: "#19177a",
      light: "#9c9af5",
    },
    success: {
      main: "#b6f5ab",
    },
    info: {
      main: "#fff",
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 724,
      desktop: 1440,
    },
  },
});
