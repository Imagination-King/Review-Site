import * as React from "react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import "./App.css";
import TierList from "./components/TierList";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <h1>TV Show Tier List</h1>
      <TierList themeLightDark={theme.palette.mode} />
    </ThemeProvider>
  );
}

export default App;
