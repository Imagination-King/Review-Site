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

  /*
  Object.keys(tierData).map: This iterates over each tier level.
  <div key={tier}>: For each tier, we create a div with a unique key to ensure efficient updates.
  <h2>{tier}</h2>: Displays the tier name.
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>: This container holds all the shows in the current tier and uses flexbox to arrange them.
  {tierData[tier].map((show) => ( <ShowCard key={show.SortName} show={show} /> ))}: For each show in the current tier, we render a ShowCard component, passing the show data as a prop.
  */
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