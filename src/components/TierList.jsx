import { useState, useEffect } from "react";
import ShowCard from "./ShowCard";

function TierList() {
  const [tierData, setTierData] = useState({});
  const [error, setError] = useState(null);

  const JSON_URL =
    "https://gist.githubusercontent.com/Imagination-King/041d38bac40cd81eebb92506a180f3d1/raw/0f1cffbde7cd48250ef3fe84968c0f0d9762bc5c/tvShowsGraded.json";

  //in case the server decides to not cooperate, use a local backup
  const useLocalFile = false;
  const LOCAL_JSON_URL = "/tvShowsGraded.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = useLocalFile ? LOCAL_JSON_URL : JSON_URL;
        console.log(`Fetching data from ${url}`);
        const response = await fetch(url, { mode: "cors" });

        if (response.status >= 400) {
          //in case JSON isn't found due to network or pathing issues
          throw new Error("server error");
        }

        const data = await response.json();
        console.log('Fetched data: ', data);

        //Creates arrays for each Tier of the Tier List and pushes each show into the appropriate array
        const tiers = data.reduce((acc, show) => {
          if (!acc[show.Tier]) {
            acc[show.Tier] = [];
          }
          acc[show.Tier].push(show);
          return acc;
        }, {});

        //Sort shows alphabetically in each tier
        for (const tier in tiers) {
          tiers[tier].sort((a, b) => {
            const titleA = a.Title.replace(/^The\s+/i, "");
            const titleB = b.Title.replace(/^The\s+/i, "");
            return titleA.localeCompare(titleB);
          });
        }

        setTierData(tiers);
      } catch (error) {
        console.error('Error fetching or processing data: ', error);
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

  return (
    <div>
      {
        //this whole thing loops over every show, going tier by tier
        Object.keys(tierData).map((tier) => (
          <div key={tier}>
            <h2>{tier}</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {
                //this creates a little card for each show as we map over each tier
                tierData[tier].map((show) => (
                  <ShowCard key={show.Title} show={show} />
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default TierList;
