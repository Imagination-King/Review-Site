import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import ShowCard from "./ShowCard";
import PropTypes from "prop-types";
import useSort from "./useSort";

const SortedByTitle = ({
  theme,
  viewMode,
  tierData,
  groupExpanded,
  handleAccordionChange,
}) => {
  const sortedData = useSort("title", tierData);

  return (
    <Box>
      {Object.keys(sortedData).map((group) => (
        <Accordion
          key={group}
          expanded={groupExpanded[group] || false}
          onChange={handleAccordionChange(group)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreRounded />}
            aria-controls={`panel-${group}-content`}
            id={`panel-${group}-header`}
            sx={{
              justifyContent: "center",
              "& .MuiAccordionSummary-content": {
                justifyContent: "center",
              },
            }}
          >
            <Typography variant="h4">
              <strong>{group}</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {sortedData[group].length > 0 ? (
              sortedData[group].map((show) => (
                <ShowCard
                  key={show.Title}
                  show={show}
                  themeLightDark={theme}
                  viewMode={viewMode}
                />
              ))
            ) : (
              <Typography>No shows in this range</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

SortedByTitle.propTypes = {
  theme: PropTypes.string.isRequired,
  viewMode: PropTypes.string.isRequired,
  tierData: PropTypes.object.isRequired,
  groupExpanded: PropTypes.object.isRequired,
  handleAccordionChange: PropTypes.func.isRequired,
};

export default SortedByTitle;
