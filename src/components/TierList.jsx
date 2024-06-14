import { useState } from "react";
import PropTypes from "prop-types";

//ShowCard no longer needed here
import useFetchData from "./useFetchData";
import useSort from "./useSort";
import SortedByTier from "./SortedByTier";
import SortedByTitle from "./SortedByTitle";
import SortedByStatus from "./SortedByStatus";

import { useNavigate, Routes, Route, Link, Navigate } from "react-router-dom";
//a lot of MUI stuff is no longer needed here
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  SortRounded,
  UnfoldLessRounded,
  UnfoldMoreRounded,
} from "@mui/icons-material";

function TierList({ theme }) {
  const navigate = useNavigate();
  const [groupExpanded, setGroupExpanded] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortMode, setSortMode] = useState("tier");
  const [viewMode, setViewMode] = useState("grid");

  const JSON_URL =
    "https://gist.githubusercontent.com/Imagination-King/041d38bac40cd81eebb92506a180f3d1/raw/tvShowsGraded.json";

  //in case the server decides to not cooperate, use a local backup
  const useLocalFile = false;
  const LOCAL_JSON_URL = "/tvShowsGraded.json";

  const { tierData, tiersDefined, error } = useFetchData(
    JSON_URL,
    LOCAL_JSON_URL,
    useLocalFile
  );

  const handleViewChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  //keep this version, handleSortClick no longer needed
  const handleSortClose = (mode) => {
    setAnchorEl(null);
    setSortMode(mode);
    navigate(`/${mode}`);
  };

  //tracks accordion open/close state for expand+collapse button logic
  const handleAccordionChange = (key) => (event, isExpanded) => {
    setGroupExpanded((prevExpanded) => ({
      ...prevExpanded,
      [key]: isExpanded,
    }));
  };

  //epand+collapse button logic
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

  const sortedData = useSort(sortMode, tierData);

  if (error) {
    return (
      <p>
        We appear to be having network-related issues. Please contact site admin
        for assitance.
      </p>
    );
  }

  if (
    !tierData ||
    Object.keys(tierData).length === 0 ||
    tiersDefined.length === 0
  ) {
    return <p>Loading data. Please wait...</p>;
  }

  return (
    <Box>
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
      <Box //Option Bar starts here
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            variant="outlined"
            id="sort-button"
            startIcon={<SortRounded />}
            aria-controls="sort-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Sort
          </Button>
          <Menu
            id="sort-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "sort-button",
            }}
          >
            <MenuItem
              component={Link}
              to="/tier"
              onClick={() => handleSortClose("tier")}
            >
              Tier
            </MenuItem>
            <MenuItem
              component={Link}
              to="/title"
              onClick={() => handleSortClose("title")}
            >
              Title
            </MenuItem>
            <MenuItem
              component={Link}
              to="/watch-status"
              onClick={() => handleSortClose("watch-status")}
            >
              Watch Status
            </MenuItem>
          </Menu>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            variant="outlined"
            startIcon={<UnfoldMoreRounded />}
            onClick={handleExpandAll}
          >
            Expand
          </Button>
          <Button
            variant="outlined"
            startIcon={<UnfoldLessRounded />}
            onClick={handleCollapseAll}
          >
            Collapse
          </Button>
        </Box>
      </Box>
      <Routes>
        <Route path="/" element={<Navigate to="/tier" replace />} />
        <Route
          path="/tier"
          element={
            <SortedByTier
              theme={theme}
              viewMode={viewMode}
              tierData={tierData}
              tiersDefined={tiersDefined}
              groupExpanded={groupExpanded}
              handleAccordionChange={handleAccordionChange}
            />
          }
        />
        <Route
          path="/title"
          element={
            <SortedByTitle
              theme={theme}
              viewMode={viewMode}
              tierData={tierData}
              groupExpanded={groupExpanded}
              handleAccordionChange={handleAccordionChange}
            />
          }
        />
        <Route
          path="/watch-status"
          element={
            <SortedByStatus
              theme={theme}
              viewMode={viewMode}
              tierData={tierData}
              groupExpanded={groupExpanded}
              handleAccordionChange={handleAccordionChange}
            />
          }
        />
      </Routes>
    </Box>
  );
}

TierList.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default TierList;
