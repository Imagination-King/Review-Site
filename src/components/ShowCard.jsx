import { useState } from "react";
import PropTypes from "prop-types";
import ShowModal from "./ShowModal";
import { Box, Typography, Stack } from "@mui/material";

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

const renderDates = (PremiereDate, EndDate) => {
  if (EndDate === 0) {
    //when the show is still airing or has been renewed for future seasons
    return `${PremiereDate} - Present`;
  } else if (EndDate === PremiereDate) {
    //when the show aired entirely in a single year
    return `${PremiereDate}`;
  } else {
    return `${PremiereDate} - ${EndDate}`;
  }
};

function ShowCard({ show, themeLightDark, viewMode }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const themedStyles = tierStyles(themeLightDark)[show.Tier];

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

  const imgStyle = {
    width: viewMode === "grid" ? "150px" : "50px",
    height: viewMode === "grid" ? "225px" : "75px",
    paddingTop: viewMode === "grid" ? "5px" : undefined,
    paddingLeft: viewMode === "grid" ? "0" : "20px",
    objectFit: "cover",
  };

  const textStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: viewMode === "grid" ? "150px" : "auto",
    marginLeft: viewMode === "grid" ? "0" : "20px",
  };

  return (
    <>
      <Box onClick={handleCardClick} sx={cardStyle}>
        <Typography>
          {show.Tier} {viewMode === "grid" ? "Tier" : undefined}{" "}
        </Typography>
        <img src={show.ImageLink} alt={show.Title} style={imgStyle} />
        <Stack direction="row" spacing={5}>
          <Typography sx={textStyle}>{show.Title}</Typography>
          {viewMode === "list" && (
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
