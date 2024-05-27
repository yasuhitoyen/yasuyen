import React from "react";
import { Link } from "react-router-dom";
const SummonerNameDisplay = (props) => {
  // {`${props.player.summonerName}: ${props.player.kills}/${props.player.deaths}/${props.player.assists}`}
  const currentVersion = props.currentVersion;
  const riotId = props.player.riotIdGameName;
  const tagLine = props.player.riotIdTagline;
  // Truncate riotId if it exceeds 12 characters
  const truncatedRiotId =
    riotId.length > 12 ? `${riotId.slice(0, 14)}...` : riotId;
  var champIcon = props.player.championName;
  return (
    <div className="flex flex-row">
      <img
        className="w-[15px] h-[15px] mx-2 rounded-sm"
        src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${champIcon}.png`}
      ></img>
      <Link to={`/search/${riotId}/${tagLine}`}>
        <h4 className=" hover:scale-[1.02] text-bold font-light text-[10px] tracking-tighter transition-all duration-100">{`${truncatedRiotId}`}</h4>
      </Link>
    </div>
  );
};

export default SummonerNameDisplay;
