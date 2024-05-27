import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BestChampPanel from "./BestChampPanel";
import AskChatbox from "./AskChatbox";
import MatchHistory from "./match/MatchHistory";
import { getRankedStats, getRecentChampion } from "./scripts/PersonalizedStats";

function SearchResults() {
  const { riotGameName, riotTagLine } = useParams();
  const [matchHistory, setMatchHistory] = useState(null);
  const [username, setUsername] = useState(`${riotGameName}#${riotTagLine}`);
  const [currentVersion, setCurrentVersion] = useState();
  const [rankedStats, setRankedStats] = useState(null);
  const [riotID, setRiotID] = useState(`${riotGameName}#${riotTagLine}`);
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(`${riotGameName}#${riotTagLine}`);
    setRiotID(`${riotGameName}#${riotTagLine}`);
  }, [riotGameName, riotTagLine]);

  const handleSearch = () => {
    const [gameName, tagLine] = riotID.split("#");
    if (gameName && tagLine) {
      navigate(`/search/${gameName}/${tagLine}`);
    } else {
      alert("Please enter a valid Riot ID in the format 'GameName#TagLine'");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    async function fetchRankedStats() {
      if (username) {
        const stats = await getRankedStats(username);
        setRankedStats(stats);
        if (stats.length === 0) {
          console.log("UNRANKED");
        } else {
          console.log(stats);
        }
      }
    }
    fetchRankedStats();
  }, [username]);

  useEffect(() => {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((response) => response.json())
      .then((versions) => {
        setCurrentVersion(versions[0]); // The first element is the latest version
        console.log("League of Legends Current Version:", currentVersion);
      })
      .catch((error) => console.error("Error fetching game version:", error));
  }, []);

  return (
    <div>
      <div className="flex h-32">
        <BestChampPanel
          bestChampion={getRecentChampion(matchHistory, username)}
          matchHistory={matchHistory}
          rankedStats={rankedStats} // Pass rankedStats directly
          riotID = {username}
        />
      </div>

      <div className="flex flex-row">
        <div className="w-80"></div>
        <div className="flex-col">
          <AskChatbox matchHistory={matchHistory} riotID={riotGameName + "#" + riotTagLine}/>
          {/* Search Box */}
          <div className="flex items-center justify-start mt-5">
            <div className="text-center rounded-xl w-[500px] flex flex-col">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Riot ID (e.g., GameName#TagLine)"
                  value={riotID}
                  onChange={(e) => setRiotID(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border rounded-2xl p-2 m-2 w-full text-center shadow-2xl outline-none"
                />
                <button
                  onClick={handleSearch}
                  className="p-2 m-2 text-lime-600 rounded-3xl tracking-wide px-2 text-center bg-lime-200 border-[1.5px] border-lime-300 hover:scale-[105%] transition-all duration-50 shadow-xl"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-3 rounded-3xl bg-opacity-65 shadow-2xl border-1 border-black bg-white lg:w-[930px] w-[830px] transition-all duration-200">
            <div className="px-3 py-3">
              <MatchHistory
                riotID={username}
                currentVersion={currentVersion}
                setAppMatchHistory={setMatchHistory}
                setAppUsername={setUsername}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
