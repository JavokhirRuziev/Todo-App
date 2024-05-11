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
      main: "#5be381",
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
  overrides: {
    MuiTextField: {
      root: {
        padding: "2px",
      },
      padding: "2px",
    },
  },
});
