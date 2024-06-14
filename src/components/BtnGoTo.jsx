import { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const GoTopBtn = () => {
  const [showGoTop, setShowGoTop] = useState(false);

  const handleGoTopVisible = () => {
    const position = window.scrollY;
    if (position > 50) {
      return setShowGoTop(true);
    } else {
      return setShowGoTop(false);
    }
  };

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleGoTopVisible);
    return () => {
      window.removeEventListener("scroll", handleGoTopVisible);
    };
  }, []);

  return (
    <>
      {showGoTop && (
        <div
          onClick={handleScrollUp}
          style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            zIndex: 1000,
          }}
        >
          <Fab color="primary" size="medium" aria-label="scroll to top">
            <KeyboardArrowUp fontSize="large" />
          </Fab>
        </div>
      )}
    </>
  );
};

export default GoTopBtn;
