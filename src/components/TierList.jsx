import { useState } from "react";
import ShowCard from "./ShowCard";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import {
  ExpandMoreRounded,
  SortRounded,
  UnfoldLessRounded,
  UnfoldMoreRounded,
} from "@mui/icons-material";
import useFetchShowData from "./useFetchShowData";
import useSort from "./useSort";
import PropTypes from "prop-types";

function TierList({ mode }) {
  const [tierExpanded, setTierExpanded] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortMode, setSortMode] = useState("tier");

  const JSON_URL =
    "https://gist.githubusercontent.com/Imagination-King/041d38bac40cd81eebb92506a180f3d1/raw/tvShowsGraded.json";

  //in case the server decides to not cooperate, use a local backup
  const useLocalFile = false;
  const LOCAL_JSON_URL = "/tvShowsGraded.json";

  const { tierData, tiersDefined, error} = useFetchShowData(JSON_URL, LOCAL_JSON_URL, useLocalFile);

  //sort menu logic
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

  //epand+collapse button logic
  const handleExpandAll = () => {
    Object.keys(tierData).forEach((key, index) => {
      setTimeout(() => {
        setTierExpanded((prevExpanded) => ({
          ...prevExpanded,
          [key]: true,
        }));
      }, index * 50); // delays opening of tiers for visual effect
    });
  };

  const handleCollapseAll = () => {
    Object.keys(tierData).forEach((key, index) => {
      setTimeout(() => {
        setTierExpanded((prevExpanded) => ({
          ...prevExpanded,
          [key]: false,
        }));
      }, index * 50); // delays closing of tiers for visual effect
    });
  };

  //tracks accordion open/close state for expand+collapse button logic
  const handleAccordionChange = (key) => (event, isExpanded) => {
    setTierExpanded((prevExpanded) => ({
      ...prevExpanded,
      [key]: isExpanded,
    }));
  };
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

  return (
    <Box sx={{ p: 1 }}>
      <Box //Option Bar starts here
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
            <MenuItem onClick={() => handleSortClose("watch-status")}>Watch Status</MenuItem>
          </Menu>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button startIcon={<UnfoldMoreRounded />} onClick={handleExpandAll}>
            Expand
          </Button>
          <Button startIcon={<UnfoldLessRounded />} onClick={handleCollapseAll}>
            Collapse
          </Button>
        </Box>
      </Box>
      {(() => {
        //conditional HTML depending on what sortMode is set to, default is Tier
        if (sortMode === "tier") {
          return tiersDefined
            .sort((a, b) => a.order - b.order)
            .map((tier) => (
              <Accordion
                key={tier.key}
                expanded={tierExpanded[tier.key] || false}
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
                  {
                    //prevents uncaught reference errors from map function
                    sortedData[tier.key]?.length > 0 ? (
                      sortedData[tier.key].map((show) => (
                        <ShowCard key={show.Title} show={show} mode={mode} />
                      ))
                    ) : (
                      <Typography>No shows in this tier</Typography>
                    )
                  }
                </AccordionDetails>
              </Accordion>
            ));
          //conditional HTML continues, with sortMode set to Title
        } else if (sortMode === "title") {
          return Object.keys(sortedData).map((group) => (
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
                      <ShowCard key={show.Title} show={show} mode={mode} />
                    ))
                  ) : (
                    <Typography>No shows in this range</Typography>
                  )
                }
              </AccordionDetails>
            </Accordion>
          ));
        } else if (sortMode === "watch-status") {
          return Object.keys(sortedData).map((status) => (
            <Accordion
              key={status}
              expanded={tierExpanded[status] || false}
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
                {
                  //prevents uncaught reference errors from map function
                  sortedData[status].length > 0 ? (
                    sortedData[status].map((show) => (
                      <ShowCard key={show.Title} show={show} mode={mode} />
                    ))
                  ) : (
                    <Typography>No shows in this range</Typography>
                  )
                }
              </AccordionDetails>
            </Accordion>
          ));
        } //additional sort modes would go here
      })()}
    </Box>
  );
}

TierList.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default TierList;
