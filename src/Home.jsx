import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PandaLoLBackground from "./assets/PandaLoLBackground.png";
import CleanPandaLoL from "./assets/CleanPandaLoL.png";

function Home() {
  const [riotID, setRiotID] = useState("");
  const navigate = useNavigate();

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

  return (
    <div className="flex items-center justify-center h-[600px]">
      <div className="text-center rounded-xl w-[500px] flex flex-col">
        <img src={CleanPandaLoL} alt="Logo" className="mx-auto w-40" />
        <div className="flex">
          <div className="flex flex-col w-[500px]">
            <input
              type="text"
              placeholder="Riot ID (e.g., GameName#TagLine)"
              value={riotID}
              onChange={(e) => setRiotID(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border rounded-3xl p-2 m-2 w-full text-center"
            />
            <Link to={`/search/innerdawg/8639`}>
              <h4 className=" font-light hover:scale-[1.02] transition-all duration-200">
                Or visit the creators profile?
              </h4>
            </Link>
          </div>

          <button
            onClick={handleSearch}
            className="p-2 m-2 text-lime-600 rounded-3xl tracking-wide px-2 text-center bg-lime-200 border-[1.5px] border-lime-300 hover:scale-[105%] transition-all duration-50 h-[40px]"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
