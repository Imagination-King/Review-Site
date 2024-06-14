import * as React from "react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { Routes, Route } from "react-router-dom";
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
      <Routes>
        <Route path="*" element={<TierList theme={theme.palette.mode} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
