import PropTypes from "prop-types";
import { Modal, Box, Typography, IconButton, Chip, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 800,
  bgcolor: "beige",
  color: "black",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

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

const ShowModal = ({ show, isOpen, onClose }) => {
  const {
    Title = "N/A",
    AltName = "",
    ImageLink = "",
    WatchStatus = "N/A",
    Tier = "Undecided",
    PremiereDate = 0,
    EndDate = 0,
    Tags = ["Unsorted"],
    Description = "No description available",
    Review = "No review available",
  } = show;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box display="flex" alignItems="flex-start">
          <Box flexShrink={0}>
            <img
              src={ImageLink}
              alt={Title}
              style={{ width: "300px", height: "450px", marginRight: "16px" }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              id="modal-title"
              variant="h4"
              component="h2"
              sx={{ wordWrap: "break-word" }}
            >
              <strong>{Title}</strong>
            </Typography>
            <Typography variant="h7" sx={{ color: "GrayText", mt: 0.5 }}>
              {AltName}
            </Typography>
            <Typography variant="h6">
              {renderDates(PremiereDate, EndDate)}
            </Typography>
            <Typography sx={{ mt: 0.5, mb: 0.5 }}>
              <strong>Tier:</strong> {Tier}
            </Typography>
            <Typography sx={{ mt: 0.5, mb: 1 }}>
              <strong>Watch Status:</strong> {WatchStatus}
            </Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap" }}>
              {Tags.map((tag, index) => (
                <Chip key={index} label={tag} sx={{ margin: "2px" }} />
              ))}
            </Stack>
            <Typography sx={{ mt: 1, mb: 0.5 }}>
              <strong>Description:</strong> {Description}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 1 }}>
              <strong>Review:</strong> {Review}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

ShowModal.propTypes = {
  show: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    AltName: PropTypes.string,
    ImageLink: PropTypes.string.isRequired,
    WatchStatus: PropTypes.string,
    Tier: PropTypes.string,
    PremiereDate: PropTypes.number,
    EndDate: PropTypes.number,
    Tags: PropTypes.arrayOf(PropTypes.string),
    Description: PropTypes.string,
    Review: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShowModal;
