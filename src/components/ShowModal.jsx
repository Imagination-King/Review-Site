import PropTypes from "prop-types";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Chip,
  Stack,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Styling for all modals
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 800,
  maxHeight: "85%",
  bgcolor: "beige", // May change this later
  color: "black",
  boxShadow: 24,
  p: 4,
  outline: "none",
  overflowY: "auto",
};

// Renders dates properly
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

  // Use MUI's built-in breakpoints for media queries
  const isScreenSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        {/* Little X in top right corner for closing modal */}
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
        <Box
          display="flex"
          flexDirection={isScreenSmall ? "column" : "row"}
          alignItems={isScreenSmall ? "center" : "flex-start"}
        >
          <Box flexShrink={0}>
            <img
              src={ImageLink}
              alt={Title}
              style={{
                width: isScreenSmall ? "200px" : "300px",
                height: isScreenSmall ? "300px" : "450px",
                objectFit: "cover",
                marginRight: isScreenSmall ? "0" : "16px",
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              id="modal-title"
              variant="h4"
              component="h2"
              sx={{
                wordWrap: "break-word",
                textAlign: isScreenSmall ? "center" : "left",
              }}
            >
              <strong>{Title}</strong>
            </Typography>
            <Typography
              sx={{
                color: "GrayText",
                mt: 0.5,
                textAlign: isScreenSmall ? "center" : "left",
              }}
            >
              {/* Typically the untranslated name for anime shows */}
              {AltName}
            </Typography>
            <Typography
              variant="h6"
              sx={{ textAlign: isScreenSmall ? "center" : "left" }}
            >
              {renderDates(PremiereDate, EndDate)}
            </Typography>
            <Typography
              sx={{
                mt: 0.5,
                mb: 0.5,
                textAlign: isScreenSmall ? "center" : "left",
              }}
            >
              <strong>TIER:</strong> {Tier}
            </Typography>
            <Typography
              sx={{
                mt: 0.5,
                mb: 1,
                textAlign: isScreenSmall ? "center" : "left",
              }}
            >
              <strong>WATCH STATUS:</strong> {WatchStatus}
            </Typography>
            {/* Eventually, these tags will be color-coded and clickable */}
            <Stack
              direction="row"
              sx={{
                flexWrap: "wrap",
                justifyContent: isScreenSmall ? "center" : "left",
              }}
            >
              {Tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{
                    margin: "2px",
                    color: "black",
                    background: "lightgray",
                  }}
                />
              ))}
            </Stack>
            <Typography sx={{ mt: 1, mb: 0.5 }}>
              <strong>DESCRIPTION</strong>
              <br /> {Description}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 1 }}>
              <strong>REVIEW</strong>
              <br /> {Review}
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
