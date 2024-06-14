import { useState } from "react";
import PropTypes from "prop-types";
import ShowModal from "./ShowModal";
import { Box, Typography, Stack } from "@mui/material";

// Tier-Specific styling according to theme
const tierStyles = (themeLightDark) => ({
  themeLightDark,
  ...(themeLightDark === "light"
    ? {
        // Card colors for light mode, might change later
        S: { borderColor: "gold", bgcolor: "#FFFA80" },
        A: { borderColor: "#BA00FF", bgcolor: "#DD80FF" }, //purple
        B: { borderColor: "#002FFF", bgcolor: "#8098FF" }, //blue
        C: { borderColor: "#09C400", bgcolor: "#86FF80" }, //green
        D: { borderColor: "#FF9300", bgcolor: "#FFCA80" }, //orange
        F: { borderColor: "#FF0000", bgcolor: "#FF7F7F" }, //red
        K: { borderColor: "#a8dadc", bgcolor: "#D0FEFF" }, //pale blue-ish
        U: { borderColor: "black", bgcolor: "#E4E4E4" }, //dark gray w/black outline
      }
    : {
        // Card colors for dark mode (lighter versions of above colors)
        S: { borderColor: "gold", bgcolor: "#938D00" },
        A: { borderColor: "#BA00FF", bgcolor: "#6B0093" },
        B: { borderColor: "#002FFF", bgcolor: "#001B93" },
        C: { borderColor: "#09C400", bgcolor: "#079300" },
        D: { borderColor: "#FF9300", bgcolor: "#945600" },
        F: { borderColor: "#FF0000", bgcolor: "#940000" },
        K: { borderColor: "#a8dadc", bgcolor: "#587D7E" },
        U: { borderColor: "white", bgcolor: "#4A4A4A" }, //light gray w/white outline
      }),
});

// Copied from ShowModal, renders Dates properly
const renderDates = (PremiereDate, EndDate) => {
  if (EndDate === 0) {
    // 0 is for still airing or renewed shows
    return `${PremiereDate} - Present`;
  } else if (EndDate === PremiereDate) {
    return `${PremiereDate}`;
  } else {
    return `${PremiereDate} - ${EndDate}`;
  }
};

function ShowCard({ show, themeLightDark, viewMode }) {
  const [modalOpen, setModalOpen] = useState(false); // Tracks open/close state of Modal

  const handleCardClick = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const themedStyles = tierStyles(themeLightDark)[show.Tier];

  // Card styling based on view mode
  const cardStyle = {
    width: viewMode === "grid" ? "170px" : "100%",
    display: "flex",
    flexDirection: viewMode === "grid" ? "column" : "row",
    alignItems: "center",
    cursor: "pointer",
    border: viewMode === "grid" ? "5px solid" : "2px solid",
    borderRadius: viewMode === "grid" ? "10px" : "50px",
    boxShadow: "inset 0 0 15px rgba(0, 0, 0, .5)",
    p: viewMode === "grid" ? "10px" : "5px 2em",
    m: "3px",
    ...themedStyles,
  };

  // Image styling based on view mode
  const imgStyle = {
    width: viewMode === "grid" ? "150px" : "50px",
    height: viewMode === "grid" ? "225px" : "75px",
    // Padding directions: top right bottom left
    padding: viewMode === "grid" ? "3px 0 5px 0" : "0 20px",
    // Crops image to fit boundary
    objectFit: "cover",
  };

  // Text styling based on view mode
  const textStyle = {
    // Prevent text overflow in grid mode
    whiteSpace: viewMode === "grid" ? "nowrap" : "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: viewMode === "grid" ? "150px" : "auto",
  };

  return (
    <>
      <Box onClick={handleCardClick} sx={cardStyle}>
        <Typography>
          {/* The word "Tier" only appears in grid mode */}
          {show.Tier} {viewMode === "grid" ? "Tier" : ""}
        </Typography>
        <img src={show.ImageLink} alt={show.Title} style={imgStyle} />
        <Stack direction="row" spacing={5}>
          <Typography sx={textStyle}>{show.Title}</Typography>
          {viewMode === "list" && (
            // Additional info for list mode
            <>
              <Typography>
                {renderDates(show.PremiereDate, show.EndDate)}
              </Typography>
              <Typography>{show.WatchStatus}</Typography>
            </>
          )}
        </Stack>
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
    WatchStatus: PropTypes.string.isRequired,
    PremiereDate: PropTypes.number.isRequired,
    EndDate: PropTypes.number.isRequired,
  }).isRequired,
  themeLightDark: PropTypes.string.isRequired,
  viewMode: PropTypes.string.isRequired,
};
export default ShowCard;
