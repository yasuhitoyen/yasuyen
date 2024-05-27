import React from "react";
import { Link } from "react-router-dom";
const DetailedSummonerNameDisplay = (props) => {
  let username = "---";
  const teamId = props.player.teamId;
  const currentVersion = props.currentVersion;
  username = props.player.riotIdGameName;
  const riotId = props.player.riotIdGameName;
  const tagLine = props.player.riotIdTagline;
  // Truncate username if it exceeds 12 characters
  const truncatedUsername =
    username.length > 12 ? `${username.slice(0, 14)}...` : username;
  const champIcon = props.player.championName;

  if (teamId == 100) {
    return (
      <div className="flex flex-row">
        <img
          className="w-[26px] h-[26px] mx-2 rounded-md"
          src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${champIcon}.png`}
          alt={`${champIcon}`}
        />
        <Link to={`/search/${riotId}/${tagLine}`}>
          <h4 className="text-bold font-light text-[15px] tracking-tighter hover:scale-[1.02] transition-all duration-150">
            {truncatedUsername}
          </h4>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-end ">
        <Link to={`/search/${riotId}/${tagLine}`}>
          <h4 className="text-bold font-light text-[15px] tracking-tighter hover:scale-[1.02] transition-all duration-150">
            {truncatedUsername}
          </h4>
        </Link>
        <img
          className="w-[22px] h-[22px] mx-2 rounded-sm"
          src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${champIcon}.png`}
          alt={`${champIcon}`}
        />
      </div>
    );
  }
};

export default DetailedSummonerNameDisplay;
