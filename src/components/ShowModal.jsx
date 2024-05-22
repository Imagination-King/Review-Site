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
  bgcolor: "background.paper",
  color: "black",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const ShowModal = ({ show, isOpen, onClose }) => {
  const {
    Title = "N/A",
    ImageLink = "",
    WatchStatus = "N/A",
    Tier = "N/A",
    PremiereDate = 0,
    EndDate = 0,
    Tags = [],
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
            <img src={ImageLink} alt={Title} style={{ width: "300px", height: "450px", marginRight: "16px" }} />
          </Box>
          <Box>
            <Typography id="modal-title" variant="h4" component="h2">
              <strong>{Title}</strong>
            </Typography>
            <Typography id="modal-subtitle" variant="h5" sx={{ mt: .5, }}>
              Alternate Title
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {PremiereDate} - {EndDate}
            </Typography>
            <Typography>
              <strong>Tier:</strong> {Tier}
            </Typography>
            <Typography>
              <strong>Watch Status:</strong> {WatchStatus}
            </Typography>
            <Stack direction="row">
              {Tags.map((tag, index) => (
                <Chip key={index} label={tag} sx={{ margin: "2px" }}/>
              ))}
            </Stack>
            <Typography sx={{ mt: 4 }}>
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