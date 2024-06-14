import React, { useRef } from "react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import TierList from "./components/TierList";
import GoTopBtn from "./components/BtnGoTo";

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
        <Routes>
          <Route path="*" element={<TierList theme={theme.palette.mode} />} />
        </Routes>
        <GoTopBtn />
      </ThemeProvider>
    </>
  );
}

export default App;
