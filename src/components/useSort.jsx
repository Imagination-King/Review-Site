import { useCallback, useMemo } from "react";

const useSort = (sortMode, tierData) => {
  // Callbacks are used to prevent infinite rerendering
  const sortByTier = useCallback(() => {
    const tierSplit = { ...tierData };

    // Keeps items in each tier sorted alphabetically
    for (const tier in tierSplit) {
      tierSplit[tier].sort((a, b) => {
        // Ignore "The" at beginning of titles
        const titleA = a.Title.replace(/^The\s+/i, "");
        const titleB = b.Title.replace(/^The\s+/i, "");
        return titleA.localeCompare(titleB);
      });
    }
    return tierSplit;
  }, [tierData]);

  const sortByTitle = useCallback(() => {
    const alphaSplit = {
      // If you change these ranges, make sure to change them below too
      "#-F": [],
      "G-M": [],
      "N-R": [],
      "S-Z": [],
    };

    Object.values(tierData)
      .flat()
      .forEach((show) => {
        const title = show.Title.replace(/^The\s+/i, "");
        const firstLetter = title.charAt(0).toUpperCase();

        // These should match the ranges identified above
        if (firstLetter >= "0" && firstLetter <= "F") {
          alphaSplit["#-F"].push(show);
        } else if (firstLetter >= "G" && firstLetter <= "M") {
          alphaSplit["G-M"].push(show);
        } else if (firstLetter >= "N" && firstLetter <= "R") {
          alphaSplit["N-R"].push(show);
        } else if (firstLetter >= "S" && firstLetter <= "Z") {
          alphaSplit["S-Z"].push(show);
        }
      });

    // Without this, shows will be ordered by Tier in each range
    for (const key in alphaSplit) {
      alphaSplit[key].sort((a, b) => {
        const titleA = a.Title.replace(/^The\s+/i, "");
        const titleB = b.Title.replace(/^The\s+/i, "");
        return titleA.localeCompare(titleB);
      });
    }
    return alphaSplit;
  }, [tierData]);

  const sortByStatus = useCallback(() => {
    const statusSplit = {
      // These values are based on JSON data
      Watching: [],
      Completed: [],
      Hold: [],
      Quit: [],
    };

    Object.values(tierData)
      .flat()
      .forEach((show) => {
        const status = show.WatchStatus;
        if (status === "Watching") {
          statusSplit.Watching.push(show);
        } else if (status === "Completed") {
          statusSplit.Completed.push(show);
        } else if (status === "Hold") {
          statusSplit.Hold.push(show);
        } else if (status === "Quit") {
          statusSplit.Quit.push(show);
        }
      });

    // Without this, shows will be ordered by Tier in each range
    for (const key in statusSplit) {
      statusSplit[key].sort((a, b) => {
        const titleA = a.Title.replace(/^The\s+/i, "");
        const titleB = b.Title.replace(/^The\s+/i, "");
        return titleA.localeCompare(titleB);
      });
    }

    return statusSplit;
  }, [tierData]);

  const sortedData = useMemo(() => {
    if (sortMode === "title") {
      return sortByTitle();
    } else if (sortMode === "watch-status") {
      return sortByStatus();
    } else {
      return sortByTier();
    }
  }, [sortMode, sortByTitle, sortByTier, sortByStatus]);
  return sortedData;
};

export default useSort;
