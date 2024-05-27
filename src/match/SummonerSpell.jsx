import React, { useState, useEffect } from "react";

const SummonerSpell = (props) => {
  const [imageExists, setImageExists] = useState(true);

  var summonerStr;

  switch (props.summonerSpell) {
    case 4:
      summonerStr = "SummonerFlash";
      break;
    case 12:
      summonerStr = "SummonerTeleport";
      break;
    case 14:
      summonerStr = "SummonerDot";
      break;
    case 7:
      summonerStr = "SummonerHeal";
      break;
    case 6:
      summonerStr = "SummonerHaste";
      break;
    case 11:
      summonerStr = "SummonerSmite";
      break;
    case 3:
      summonerStr = "SummonerExhaust";
      break;
    case 21:
      summonerStr = "SummonerBarrier";
      break;
    case 1:
      summonerStr = "SummonerBoost";
      break;
    case 32:
      summonerStr = "SummonerSnowball";
      break;
    case 13:
      summonerStr = "SummonerMana"; // Clarity
      break;
    case 30:
      summonerStr = "SummonerPoroRecall"; // Mark
      break;
    case 31:
      summonerStr = "SummonerPoroThrow"; // Dash
      break;
    default:
      summonerStr = null;
      break;
  }

  useEffect(() => {
    if (summonerStr) {
      const img = new Image();
      img.onload = () => setImageExists(true);
      img.onerror = () => setImageExists(false);
      img.src = `http://ddragon.leagueoflegends.com/cdn/${props.currentVersion}/img/spell/${summonerStr}.png`;
    }
  }, [summonerStr, props.currentVersion]);

  return (
    imageExists ? (
      <div className="w-8 h-8 lg:w-8 lg:h-8 bg-white rounded-md border-[1px] flex justify-center items-center transition-all duration-1000">
        <img
          className="rounded-md"
          src={`http://ddragon.leagueoflegends.com/cdn/${props.currentVersion}/img/spell/${summonerStr}.png`}
          alt={summonerStr}
          draggable="false"
        />
      </div>
    ) : (
      <div></div>
    )
  );
};

export default SummonerSpell;
