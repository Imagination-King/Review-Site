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

const SortedByTitle = (
  theme,
  tierData,
  tierExpanded,
  handleAccordionChange
) => {
  const sortedData = useSort("title", tierData);
  return (
    <Box sx={{ p: 1 }}>
      {Object.keys(sortedData).map((group) => (
        <Accordion
          key={group}
          expanded={tierExpanded[group] || false}
          onChange={handleAccordionChange(group)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreRounded />}
            aria-controls={`panel-${group}-content`}
            id={`panel-${group}-header`}
            variant="h4"
            component="h2"
            sx={{
              justifyContent: "center",
              "& .MuiAccordionSummary-content": {
                justifyContent: "center",
              },
            }}
          >
            <strong>{group}</strong>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {
              //prevents uncaught reference errors from map function
              sortedData[group].length > 0 ? (
                sortedData[group].map((show) => (
                  <ShowCard key={show.Title} show={show} mode={theme} />
                ))
              ) : (
                <Typography>No shows in this range</Typography>
              )
            }
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

SortedByTitle.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default SortedByTitle;
