import { useState } from "react";
import PropTypes from "prop-types";
import ShowModal from "./ShowModal";
import { Box, Typography } from "@mui/material";

const tierStyles = (themeLightDark) => ({
  themeLightDark,
  ...(themeLightDark === "light"
    ? {
        // palette values for light mode
        S: { borderColor: "gold", bgcolor: "#FFFA80" },
        A: { borderColor: "#BA00FF", bgcolor: "#DD80FF" },
        B: { borderColor: "#002FFF", bgcolor: "#8098FF" },
        C: { borderColor: "#09C400", bgcolor: "#86FF80" },
        D: { borderColor: "#FF9300", bgcolor: "#FFCA80" },
        F: { borderColor: "#FF0000", bgcolor: "#FF7F7F" },
        K: { borderColor: "#a8dadc", bgcolor: "#D0FEFF" },
        U: { borderColor: "black", bgcolor: "#E4E4E4" },
      }
    : {
        // palette values for dark mode
        S: { borderColor: "gold", bgcolor: "#938D00" },
        A: { borderColor: "#BA00FF", bgcolor: "#6B0093" }, //purple
        B: { borderColor: "#002FFF", bgcolor: "#001B93" }, //blue
        C: { borderColor: "#09C400", bgcolor: "#079300" }, //green
        D: { borderColor: "#FF9300", bgcolor: "#945600" }, //orange
        F: { borderColor: "#FF0000", bgcolor: "#940000" }, //red
        K: { borderColor: "#a8dadc", bgcolor: "#587D7E" },
        U: { borderColor: "white", bgcolor: "#4A4A4A" },
      }),
});

function ShowCard({ show, themeLightDark }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const themedStyles = tierStyles(themeLightDark)[show.Tier];

  return (
    <>
      <Box
        onClick={handleCardClick}
        sx={{
          width: "170px",
          textAlign: "center",
          cursor: "pointer",
          border: "5px solid black",
          borderRadius: "10px",
          boxShadow: "inset 0 0 15px rgba(0, 0, 0, .5)",
          p: "10px",
          paddingTop: "15px",
          m: "3px",
          ...themedStyles,
        }}
      >
        <img
          src={show.ImageLink}
          alt={show.Title}
          style={{
            width: "150px",
            height: "225px",
            objectFit: "cover",
          }}
        />
        <Typography
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {show.Title}
        </Typography>
      </Box>
      <ShowModal show={show} isOpen={modalOpen} onClose={handleModalClose} />
    </>
  );
}

ShowCard.propTypes = {
  show: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageLink: PropTypes.string.isRequired,
    Tier: PropTypes.string.isRequired,
  }).isRequired,
  themeLightDark: PropTypes.string.isRequired,
};
export default ShowCard;
