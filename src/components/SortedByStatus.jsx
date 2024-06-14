import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import ShowCard from "./ShowCard";
import useSort from "./useSort";
import PropTypes from "prop-types";

const SortedByStatus = ({
  theme,
  viewMode,
  tierData,
  groupExpanded,
  handleAccordionChange,
}) => {
  const sortedData = useSort("watch-status", tierData);

  return (
    <Box>
      {Object.keys(sortedData).map((status) => (
        <Accordion
          key={status}
          expanded={groupExpanded[status] || false}
          onChange={handleAccordionChange(status)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreRounded />}
            aria-controls={`panel-${status}-content`}
            id={`panel-${status}-header`}
            sx={{
              justifyContent: "center",
              "& .MuiAccordionSummary-content": {
                justifyContent: "center",
              },
            }}
          >
            <Typography variant="h4">
              <strong>{status}</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {sortedData[status].length > 0 ? (
              sortedData[status].map((show) => (
                <ShowCard
                  key={show.Title}
                  show={show}
                  themeLightDark={theme}
                  viewMode={viewMode}
                />
              ))
            ) : (
              <Typography>No shows in this group</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

SortedByStatus.propTypes = {
  theme: PropTypes.string.isRequired,
  viewMode: PropTypes.string.isRequired,
  tierData: PropTypes.object.isRequired,
  groupExpanded: PropTypes.object.isRequired,
  handleAccordionChange: PropTypes.func.isRequired,
};

export default SortedByStatus;
