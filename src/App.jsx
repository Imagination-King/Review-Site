import React, { useRef } from "react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import "./App.css";
import TierList from "./components/TierList";
import GoTopBtn from "./components/GoTopBtn";

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

  const refScrollUp = useRef(null);

  return (
    <>
      <div ref={refScrollUp}></div>
      <ThemeProvider theme={theme}>
        <TierList themeLightDark={theme.palette.mode} />
        <GoTopBtn />
      </ThemeProvider>
    </>
  );
}

export default App;
