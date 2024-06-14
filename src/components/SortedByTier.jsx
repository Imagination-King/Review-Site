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

const SortedByTier = ({
  theme,
  viewMode,
  tierData,
  tiersDefined,
  groupExpanded,
  handleAccordionChange,
}) => {
  const sortedData = useSort("tier", tierData);

  return (
    <Box>
      {tiersDefined
        .sort((a, b) => a.order - b.order)
        .map((tier) => (
          <Accordion
            key={tier.key}
            expanded={groupExpanded[tier.key] || false}
            onChange={handleAccordionChange(tier.key)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls={`panel-${tier.key}-content`}
              id={`panel-${tier.key}-header`}
              sx={{
                justifyContent: "center",
                "& .MuiAccordionSummary-content": {
                  justifyContent: "center",
                },
              }}
            >
              <Typography variant="h4">
                <strong>{tier.tLabel}</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {sortedData[tier.key]?.length > 0 ? (
                sortedData[tier.key].map((show) => (
                  <ShowCard
                    key={show.Title}
                    show={show}
                    themeLightDark={theme}
                    viewMode={viewMode}
                  />
                ))
              ) : (
                <Typography>No shows in this tier</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
};

SortedByTier.propTypes = {
  theme: PropTypes.string.isRequired,
  viewMode: PropTypes.string.isRequired,
  tierData: PropTypes.object.isRequired,
  tiersDefined: PropTypes.array.isRequired,
  groupExpanded: PropTypes.object.isRequired,
  handleAccordionChange: PropTypes.func.isRequired,
};

export default SortedByTier;
