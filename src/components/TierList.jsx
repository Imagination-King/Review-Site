import { useState, useEffect } from "react";
import ShowCard from "./ShowCard";
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import {
  ExpandMoreRounded,
  SortRounded,
  UnfoldLessRounded,
  UnfoldMoreRounded,
} from "@mui/icons-material";
import PropTypes from "prop-types";

function TierList({mode}) {
  const [tierData, setTierData] = useState({});
  const [error, setError] = useState(null);

  const JSON_URL =
    "https://gist.githubusercontent.com/Imagination-King/041d38bac40cd81eebb92506a180f3d1/raw/tvShowsGraded.json";

  //in case the server decides to not cooperate, use a local backup
  const useLocalFile = false;
  const LOCAL_JSON_URL = "/tvShowsGraded.json";

  //allows custom placement of tiers
  const tierOrder = {
    "Top 10": 0,
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    F: 5,
    Conflicted: 6,
    Undecided: 7,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = useLocalFile ? LOCAL_JSON_URL : JSON_URL;
        //console.log(`Fetching data from ${url}`);
        const response = await fetch(url, { mode: "cors" });

        //in case JSON isn't found due to network or pathing issues
        if (response.status >= 400) {
          throw new Error("server error");
        }

        const data = await response.json();
        //console.log('Fetched data: ', data);

        //Creates arrays for each Tier of the Tier List and pushes each show into the appropriate array
        const tiers = data.reduce((acc, show) => {
          if (!acc[show.Tier]) {
            acc[show.Tier] = [];
          }
          acc[show.Tier].push(show);
          return acc;
        }, {});

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
        //console.error('Error fetching or processing data: ', error);
        setError(error);
      }
    };

    fetchData();
  }, [useLocalFile]);

  if (error)
    return (
      <p>
        We appear to be having network-related issues. Please contact site admin
        for assitance.
      </p>
    );

  const sortedTiers = Object.keys(tierData).sort(
    (a, b) => tierOrder[a] - tierOrder[b]
  );

  return (
    <Box sx={{ p: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: "0 1em",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <SortRounded></SortRounded>
          <Typography>Sort</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <UnfoldMoreRounded></UnfoldMoreRounded>
          <Typography sx={{ pr: "1.5em" }}>Expand All</Typography>
          <UnfoldLessRounded></UnfoldLessRounded>
          <Typography>Collapse All</Typography>
        </Box>
      </Box>
      {
        //this whole thing loops over every show, going tier by tier, using sortedTiers to enforce desired Tier Order
        sortedTiers.map((tier) => (
          <Accordion
            key={tier}
            // sx={{
            //   background: "#15191c",
            //   color: "white",
            // }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls={`panel-${tier}-content`}
              id={`panel-${tier}-header`}
              variant="h4"
              component="h2"
              sx={{
                justifyContent: "center",
                "& .MuiAccordionSummary-content": {
                  justifyContent: "center",
                },
              }}
            >
              <strong>{tier}</strong>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                // background: "#121212",
              }}
            >
              {
                //this creates a little card for each show as we map over each tier
                tierData[tier].map((show) => (
                  <ShowCard key={show.Title} show={show} mode={mode}/>
                ))
              }
            </AccordionDetails>
          </Accordion>
        ))
      }
    </Box>
  );
}

TierList.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default TierList;