import { useEffect, useState } from "react";

const useFetchData = (JSON_URL, LOCAL_JSON_URL, useLocalFile) => {
  const [tierData, setTierData] = useState({});
  const [tiersDefined, setTiersDefined] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Fetching tier data
        const tierResponse = await fetch("/tiersDefined.json");
        if(tierResponse.status >= 400) {
          throw new Error("Failed to fetch tier info");
        }
        const tierData = await tierResponse.json();
        setTiersDefined(tierData);

        //Fetching show data
        const url = useLocalFile ? LOCAL_JSON_URL : JSON_URL;
        const response = await fetch(url, { mode: "cors" });
        if (response.status >= 400) {
          throw new Error("Failed to fetch show info");
        }
        const showData = await response.json();

        //Default sort mode, Creates arrays for each Tier based on tiersDefined array
        const tiers = tierData.reduce((acc, tier) => {
          acc[tier.key] = [];
          return acc;
        }, {});

        showData.forEach((show) => {
          if (tiers[show.Tier]) {
            tiers[show.Tier].push(show);
          }
        });

        setTierData(tiers);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [useLocalFile, JSON_URL, LOCAL_JSON_URL]);

  return { tierData, tiersDefined, error };
};

export default useFetchData;
