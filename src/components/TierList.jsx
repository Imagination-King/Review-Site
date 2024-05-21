import { useState, useEffect } from "react";
import ShowCard from "./ShowCard";
import shows from "../assets/tvShowsGraded";

function TierList() {
  const [tierData, setTierData] = useState({});

  //Creates arrays for each Tier of the Tier List and pushes each show into the appropriate array
  useEffect(() => {
    const tiers = shows.reduce((acc, show) => {
      if(!acc[show.Tier]) {
        acc[show.Tier] = [];
      }
      acc[show.Tier].push(show);
      return acc;
    }, {});
    setTierData(tiers);
  }, []);

  return(
    <>
      {Object.keys(tierData).map((tier) => (
        <div key={tier}>
          <h2>{tier}</h2>
          <div style={{display: "flex", flexWrap: "wrap"}}>
            {tierData[tier].map((show) => (
              <ShowCard key={show.SortName} show={show} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default TierList