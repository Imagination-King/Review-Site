import { useState, useEffect, useMemo } from "react";
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
import PropTypes from "prop-types";

function TierList({ mode }) {
  const [tierData, setTierData] = useState({});
  const [tierExpanded, setTierExpanded] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(null);

  const JSON_URL =
    "https://gist.githubusercontent.com/Imagination-King/041d38bac40cd81eebb92506a180f3d1/raw/tvShowsGraded.json";

  //in case the server decides to not cooperate, use a local backup
  const useLocalFile = false;
  const LOCAL_JSON_URL = "/tvShowsGraded.json";

  const tiersDefined = useMemo(
    () => [
      { key: "S", name: "S Tier: Current Top 10", order: 0 },
      { key: "A", name: "A Tier: All Around Great", order: 1 },
      { key: "B", name: "B Tier: Flawed But Still Enjoyable", order: 2 },
      { key: "C", name: "C Tier: They Had Their Moments", order: 3 },
      { key: "D", name: "D Tier: Mostly Wasted Potential", order: 4 },
      { key: "F", name: "F Tier: Nothing But Regret", order: 5 },
      { key: "K", name: "Conflicted Feelings", order: 6 },
      { key: "U", name: "Undecided", order: 7 },
    ],
    []
  );

  //sort menu logic
  const open = Boolean(anchorEl);
  const handleSortClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleSortClose = () => {
    setAnchorEl(null);
  };

  //epand+collapse button logic
  const handleExpandAll = () => {
    tiersDefined
      .slice()
      .reverse()
      .forEach((tier, index) => {
        setTimeout(() => {
          setTierExpanded((prevExpanded) => ({
            ...prevExpanded,
            [tier.key]: true,
          }));
        }, index * 50); // delays opening of tiers for visual effect
      });
  };
  const handleCollapseAll = () => {
    tiersDefined.forEach((tier, index) => {
      setTimeout(() => {
        setTierExpanded((prevExpanded) => ({
          ...prevExpanded,
          [tier.key]: false,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = useLocalFile ? LOCAL_JSON_URL : JSON_URL;
        const response = await fetch(url, { mode: "cors" });

        //in case JSON isn't found due to network or pathing issues
        if (response.status >= 400) {
          throw new Error("server error");
        }

        const data = await response.json();

        //Creates arrays for each Tier based on tiersDefined array
        const tiers = tiersDefined.reduce((acc, tier) => {
          acc[tier.key] = [];
          return acc;
        }, {});

        data.forEach((show) => {
          if (tiers[show.Tier]) {
            tiers[show.Tier].push(show);
          }
        });

        //Sort shows alphabetically in each tier, ignores "The" at beginning of titles
        for (const tier in tiers) {
          tiers[tier].sort((a, b) => {
            const titleA = a.Title.replace(/^The\s+/i, "");
            const titleB = b.Title.replace(/^The\s+/i, "");
            return titleA.localeCompare(titleB);
          });
        }

        setTierData(tiers);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [useLocalFile, tiersDefined]);

  if (error) {
    return (
      <p>
        We appear to be having network-related issues. Please contact site admin
        for assitance.
      </p>
    );
  }

  return (
    <Box sx={{ p: 1 }}>
      <Box
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
            onClose={handleSortClose}
            MenuListProps={{
              "aria-labelledby": "sort-button",
            }}
          >
            <MenuItem onClick={handleSortClose}>Ranking</MenuItem>
            <MenuItem onClick={handleSortClose}>Title</MenuItem>
            <MenuItem onClick={handleSortClose}>Watch Status</MenuItem>
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
      {tiersDefined
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
              <strong>{tier.name}</strong>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {
                //this check prevents uncaught reference errors from map function
                tierData[tier.key]?.length > 0 ? (
                  tierData[tier.key].map((show) => (
                    <ShowCard key={show.Title} show={show} mode={mode} />
                  ))
                ) : (
                  <Typography>No shows in this tier</Typography>
                )
              }
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
}

TierList.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default TierList;
