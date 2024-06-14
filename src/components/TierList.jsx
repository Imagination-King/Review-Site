import { useState } from "react";
import { useNavigate, Routes, Route, Link, Navigate } from "react-router-dom";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import {
  SortRounded,
  UnfoldLessRounded,
  UnfoldMoreRounded,
} from "@mui/icons-material";
import useFetchShowData from "./useFetchShowData";
import PropTypes from "prop-types";
import SortedByTier from "./SortedByTier";
import SortedByTitle from "./SortedByTitle";
import SortedByStatus from "./SortedByStatus";

function TierList({ theme }) {
  const navigate = useNavigate();
  const [tierExpanded, setTierExpanded] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortMode, setSortMode] = useState("tier");

  const JSON_URL =
    "https://gist.githubusercontent.com/Imagination-King/041d38bac40cd81eebb92506a180f3d1/raw/tvShowsGraded.json";

  //in case the server decides to not cooperate, use a local backup
  const useLocalFile = false;
  const LOCAL_JSON_URL = "/tvShowsGraded.json";

  const { tierData, tiersDefined, error } = useFetchShowData(
    JSON_URL,
    LOCAL_JSON_URL,
    useLocalFile
  );

  //sort menu logic
  // const open = Boolean(anchorEl);
  // const handleSortClick = (e) => {
  //   setAnchorEl(e.currentTarget);
  // };

  const handleSortClose = (mode) => {
    setAnchorEl(null);
    setSortMode(mode);
    navigate(`/${mode}`);
  };

  //tracks accordion open/close state for expand+collapse button logic
  const handleAccordionChange = (key) => (event, isExpanded) => {
    setTierExpanded((prevExpanded) => ({
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
      keys = Object.keys(tierData);
    } else if (sortMode === "watch-status") {
      keys = ["Watching", "Completed", "Hold", "Quit"];
    } //additional sort options would go here

    keys.forEach((key, index) => {
      setTimeout(() => {
        setTierExpanded((prevExpanded) => ({
          ...prevExpanded,
          [key]: true,
        }));
      }, index * 50); // delays opening of tiers for visual effect
    });
  };

  const handleCollapseAll = () => {
    let keys = [];
    if (sortMode === "tier") {
      keys = tiersDefined.map((tier) => tier.key);
    } else if (sortMode === "title") {
      keys = Object.keys(tierData);
    } else if (sortMode === "watch-status") {
      keys = ["Watching", "Completed", "Hold", "Quit"];
    } //additional sort options would go here

    keys.forEach((key, index) => {
      setTimeout(() => {
        setTierExpanded((prevExpanded) => ({
          ...prevExpanded,
          [key]: false,
        }));
      }, index * 50); // delays closing of tiers for visual effect
    });
  };

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
              tierData={tierData}
              tiersDefined={tiersDefined}
              tierExpanded={tierExpanded}
              handleAccordionChange={handleAccordionChange}
            />
          }
        />
        <Route
          path="/title"
          element={
            <SortedByTitle
              theme={theme}
              tierData={tierData}
              tierExpanded={tierExpanded}
              handleAccordionChange={handleAccordionChange}
            />
          }
        />
        <Route
          path="/watch-status"
          element={
            <SortedByStatus
              theme={theme}
              tierData={tierData}
              tierExpanded={tierExpanded}
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
