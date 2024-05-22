import { useState } from "react";
import PropTypes from "prop-types";
import ShowModal from "./ShowModal";
import { Box, Typography } from "@mui/material";

function ShowCard({ show }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box
        onClick={handleCardClick}
        sx={{
          cursor: "pointer",
          border: "0px solid black",
          borderRadius: "10px",
          background: "teal",
          padding: "8px",
          width: "170px",
          textAlign: "center",
          m: "2px",
        }}
      >
        <img
          src={show.ImageLink}
          alt={show.Title}
          style={{
            width: "150px",
            height: "225px",
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
  }).isRequired,
};
export default ShowCard;
