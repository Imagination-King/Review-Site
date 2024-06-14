import { useState } from "react";
import PropTypes from "prop-types";

import useFetchData from "./useFetchData";
import useSort from "./useSort";
import ShowCard from "./ShowCard";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  ExpandMoreRounded,
  SortRounded,
  UnfoldLessRounded,
  UnfoldMoreRounded,
} from "@mui/icons-material";

function TierList({ themeLightDark }) {
  const JSON_URL =
    "https://gist.githubusercontent.com/Imagination-King/041d38bac40cd81eebb92506a180f3d1/raw/tvShowsGraded.json";

  const useLocalFile = false; // Set to true to use local backup of Show Data
  const LOCAL_JSON_URL = "/tvShowsGraded.json";

  const [groupExpanded, setGroupExpanded] = useState({}); // Track open/close state for accordions
  const [anchorEl, setAnchorEl] = useState(null); // Anchor Element to keep Sort Menu attached to button
  const [sortMode, setSortMode] = useState("tier"); // Track Sort Mode state
  const [viewMode, setViewMode] = useState("grid"); // Track View Mode state

  // Fetch show data and tier definitions
  const { tierData, tiersDefined, error } = useFetchData(
    JSON_URL,
    LOCAL_JSON_URL,
    useLocalFile
  );

  // View mode button logic
  const handleViewChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  // Sort menu logic
  const open = Boolean(anchorEl);
  const handleSortClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleSortClose = (mode) => {
    setAnchorEl(null);
    if (mode && mode !== sortMode) {
      setSortMode(mode);
    }
  };

  // Tracks accordion open/close state
  const handleAccordionChange = (key) => (event, isExpanded) => {
    setGroupExpanded((prevExpanded) => ({
      ...prevExpanded,
      [key]: isExpanded,
    }));
  };

  // Epand button logic
  const handleExpandAll = () => {
    let keys = [];
    if (sortMode === "tier") {
      keys = tiersDefined.map((tier) => tier.key);
    } else if (sortMode === "title") {
      keys = Object.keys(sortedData);
    } else if (sortMode === "watch-status") {
      keys = ["Watching", "Completed", "Hold", "Quit"];
    } // Additional sort options would go here

    keys.reverse().forEach((key, index) => {
      // .reverse opens accordions in reverse order for visual benefit
      setTimeout(() => {
        setGroupExpanded((prevExpanded) => ({
          ...prevExpanded,
          [key]: true,
        }));
      }, index * 200); // Delay for visual and performance benefits
    });
  };

  // Collapse button logic
  const handleCollapseAll = () => {
    let keys = [];
    if (sortMode === "tier") {
      keys = tiersDefined.map((tier) => tier.key);
    } else if (sortMode === "title") {
      keys = Object.keys(sortedData);
    } else if (sortMode === "watch-status") {
      keys = ["Watching", "Completed", "Hold", "Quit"];
    } // Additional sort options would go here

    keys.forEach((key, index) => {
      setTimeout(() => {
        setGroupExpanded((prevExpanded) => ({
          ...prevExpanded,
          [key]: false,
        }));
      }, index * 200); // Delay for visual and performance benefits
    });
  };

  // useSort contains logic for all sorting options
  const sortedData = useSort(sortMode, tierData);

  if (error) {
    return (
      <p>
        We appear to be having network-related issues. Please contact site admin
        for assitance.
      </p>
    );
  }

  if (!sortedData || Object.keys(sortedData).length === 0) {
    return <p>Loading data. Please wait...</p>;
  }

  //----------------------------------------------
  // HTML Starts Here
  //----------------------------------------------
  return (
    <Box sx={{ p: 1 }}>
      <h1>TV Show Tier List</h1>
      <Box>
        {/* Option Bar Row 1 - View Mode Buttons */}
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
        >
          <ToggleButton value="grid" aria-label="view as grid">
            Grid
          </ToggleButton>
          <ToggleButton value="list" aria-label="view as list">
            List
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box // Option Bar Row 2 - Sort and Expand/Collapse Buttons
        sx={{
          display: "flex",
          flexDirection: "row",
          pb: ".5em",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            variant="outlined"
            id="sort-button"
            startIcon={<SortRounded />}
            aria-controls={open ? "sort-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleSortClick}
          >
            Sort
          </Button>
          <Menu
            id="sort-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleSortClose(null)}
            MenuListProps={{
              "aria-labelledby": "sort-button",
            }}
          >
            <MenuItem onClick={() => handleSortClose("tier")}>Tier</MenuItem>
            <MenuItem onClick={() => handleSortClose("title")}>Title</MenuItem>
            <MenuItem onClick={() => handleSortClose("watch-status")}>
              Watch Status
            </MenuItem>
          </Menu>
        </Box>

        {/* Expand and Collapse buttons have their own box to keep them together */}
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button startIcon={<UnfoldMoreRounded />} onClick={handleExpandAll}>
            Expand
          </Button>
          <Button startIcon={<UnfoldLessRounded />} onClick={handleCollapseAll}>
            Collapse
          </Button>
        </Box>
      </Box>

      {/* Eventually this all should be done with routing... */}
      {(() => {
        //conditional HTML depending on what sortMode is set to, default is Tier
        if (sortMode === "tier") {
          return tiersDefined
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
                  variant="h4"
                  component="h2"
                  sx={{
                    justifyContent: "center",
                    "& .MuiAccordionSummary-content": {
                      justifyContent: "center",
                    },
                  }}
                >
                  <strong>{tier.tLabel}</strong>
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
                        themeLightDark={themeLightDark}
                        viewMode={viewMode}
                      />
                    ))
                  ) : (
                    <Typography>No shows in this tier</Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            ));

          // Conditional HTML continues
        } else if (sortMode === "title") {
          return Object.keys(sortedData).map((group) => (
            <Accordion
              key={group}
              expanded={groupExpanded[group] || false}
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
                {sortedData[group].length > 0 ? (
                  sortedData[group].map((show) => (
                    <ShowCard
                      key={show.Title}
                      show={show}
                      themeLightDark={themeLightDark}
                      viewMode={viewMode}
                    />
                  ))
                ) : (
                  <Typography>No shows in this range</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ));

          // Conditional HTML continues
        } else if (sortMode === "watch-status") {
          return Object.keys(sortedData).map((status) => (
            <Accordion
              key={status}
              expanded={groupExpanded[status] || false}
              onChange={handleAccordionChange(status)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreRounded />}
                aria-controls={`panel-${status}-content`}
                id={`panel-${status}-header`}
                variant="h4"
                component="h2"
                sx={{
                  justifyContent: "center",
                  "& .MuiAccordionSummary-content": {
                    justifyContent: "center",
                  },
                }}
              >
                <strong>{status}</strong>
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
                      themeLightDark={themeLightDark}
                      viewMode={viewMode}
                    />
                  ))
                ) : (
                  <Typography>No shows in this range</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ));
        } // Additional sort modes would go here
      })()}
    </Box>
  );
}

TierList.propTypes = {
  themeLightDark: PropTypes.string.isRequired,
};

export default TierList;
