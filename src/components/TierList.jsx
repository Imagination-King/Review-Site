import { useState, useEffect } from "react";
import ShowCard from "./ShowCard";

function TierList() {
  const [tierData, setTierData] = useState({});
  const [error, setError] = useState(null);

  const JSON_URL = "https://drive.google.com/uc?export=download&id=1T6jOzw_ZcCMW9FJnsVabS063dwyI_qSQ";
 
  useEffect(() => {
    fetch(JSON_URL, {mode: "cors"})
      .then((response) => {
        if(response.status >= 400) {
          //in case JSON isn't found due to network or pathing issues
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => {
        //Creates arrays for each Tier of the Tier List and pushes each show into the appropriate array
        const tiers = data.reduce((acc, show) => {
          if(!acc[show.Tier]) {
            acc[show.Tier] = [];
          }
          acc[show.Tier].push(show);
          return acc;
        }, {});

        //Sort shows alphabetically in each tier using SortName (which drops intances of "A" and "The")
        for(const tier in tiers) {
          tiers[tier].sort((a,b) => a.SortName.localeCompare(b.SortName));
        }

        setTierData(tiers);
      })
      .catch((error) => setError(error));
  }, []);

  if (error) return <p>We appear to be having network-related issues. Please contact site admin for assitance.</p>

  return(
    <div>
      {//this whole thing loops over every show, going tier by tier
      Object.keys(tierData).map((tier) => (
        <div key={tier}>
          <h2>{tier}</h2>
          <div style={{display: "flex", flexWrap: "wrap"}}>
            {//this creates a little card for each show as we map over each tier
            tierData[tier].map((show) => (
              <ShowCard key={show.SortName} show={show} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TierList;