import React, { useState, useEffect } from "react";
import GameSummary from "./GameSummary";

function MatchHistory(props) {
  const { currentVersion, riotID, setAppMatchHistory } = props;
  const [matchHistory, setMatchHistory] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log(API_BASE_URL)
  async function fetchMatchHistory() {
    setFetching(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/match-history/${encodeURIComponent(riotID)}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error Response:', errorText);
        if (response.status === 404) {
          throw new Error("404");
        }
        throw new Error("Failed to retrieve match IDs");
      }
      const matchIDs = await response.json();

      // Fetch match details for each match ID
      const matchDetailsPromises = matchIDs.map(async (matchID) => {
        const matchResponse = await fetch(`${API_BASE_URL}/match-details/${encodeURIComponent(matchID)}`);
        if (!matchResponse.ok) {
          const errorText = await matchResponse.text();
          console.error('Error Response:', errorText);
          return null;
        }
        return matchResponse.json();
      });

      const matchDetails = await Promise.all(matchDetailsPromises);
      setMatchHistory(matchDetails.filter(match => match !== null)); // Filter out null responses
      setAppMatchHistory(matchDetails);
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    }
    setFetching(false);
  }

  useEffect(() => {
    fetchMatchHistory();
  }, [riotID]); // Dependency on riotID ensures refetch when it changes

  return (
    <>
      <div className="z-20 ">
        <div className="flex-col space-y-[4px] py-3">
          {error === "404" ? (
            <div className="text-4"><h4 className="text-center font-bold select-none">Player does not exist</h4></div>
          ) : matchHistory && !fetching ? (
            matchHistory.map((match, index) => (
              <GameSummary key={index} summary={match} summonerName={riotID} currentVersion={currentVersion} />
            ))
          ) : !fetching && matchHistory === null ? (
            <div className="text-4">Riot server down. Check back again later!</div>
          ) : (
            <div>Loading match history...</div>
          )}
        </div>
      </div>
    </>
  );
}

export default MatchHistory;
