import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 800,
  bgcolor: "background.paper",
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
    PremiereDate = "N/A",
    Tags = ["Unsorted"],
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
            <Typography id="modal-description" sx={{ mt: 2 }}>
              <strong>Watch Status:</strong> {WatchStatus}
            </Typography>
            <Typography>
              <strong>Tier:</strong> {Tier}
            </Typography>
            <Typography>
              <strong>Premiere Date:</strong> {PremiereDate}
            </Typography>
            <Typography>
              {Tags.join(", ")}
            </Typography>
            <Typography id="modal-review" sx={{ mt: 4 }}>
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
    PremiereDate: PropTypes.string,
    Tags: PropTypes.arrayOf(PropTypes.string),
    Review: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShowModal;