import React, { useState } from "react";
import GameDetails from "./GameDetails";
import SummonerNameDisplay from "./SummonerNameDisplay";
import SummonerSpell from "./SummonerSpell";
import { DownArrow } from "../assets";
import { getKillParticipation, allMatchInfo } from "../scripts/MatchDetails";
import Item from "./Item";
const GameSummary = (match) => {
  /**
   * Converts given time into minutes, seconds format
   * @param {int} d
   * @returns
   */
  const formatGameDuration = (d) =>
    `${Math.floor(d / 60)
      .toString()
      .padStart(2, "0")}m ${(d % 60).toString().padStart(2, "0")}s`;
  function getKDAColor(kda) {
    var kda_double = parseFloat(kda);
    switch (true) {
      case kda_double <= 2:
        return "text-slate-700";
      case kda_double >= 2 && kda_double <= 4:
        return "text-green-700";
      case kda_double > 4:
        return "text-red-800";
    }
  }

  function formatGameCreationTime(gameCreation) {
    const now = new Date();
    const gameDate = new Date(gameCreation);
    
    // Set the time of both dates to midnight to ignore the time part
    const midnightNow = new Date(now);
    const midnightGameDate = new Date(gameDate);
    midnightNow.setHours(0, 0, 0, 0);
    midnightGameDate.setHours(0, 0, 0, 0);
    
    const differenceInTime = midnightNow.getTime() - midnightGameDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    const differenceInMonths = Math.floor(differenceInDays / 30);
  
    if (differenceInDays === 0) {
      const differenceInHours = Math.floor((now.getTime() - gameDate.getTime()) / (1000 * 3600));
      if (differenceInHours < 1)
        return `Just now`;

      return `${differenceInHours} hours ago`;
    } else if (differenceInDays === 1) {
      return "1 day ago";
    } else if (differenceInDays < 30) {
      return `${differenceInDays} days ago`;
    } else if (differenceInMonths === 1) {
      return "1 month ago";
    } else {
      return `${differenceInMonths} months ago`;
    }
  }
  

  const [open, setOpen] = useState(false);
  const currentVersion = match.currentVersion;
  const gameCreation = match.summary.info.gameCreation;
  const formattedGameCreationTime = formatGameCreationTime(gameCreation);
  let players = allMatchInfo(match.summary, match.summonerName).players;
  var victory = allMatchInfo(match.summary, match.summonerName).victory;
  var champIcon = allMatchInfo(match.summary, match.summonerName).champIcon;
  var queueId = allMatchInfo(match.summary, match.summonerName).queueId;
  var mainPlayerKDA = allMatchInfo(
    match.summary,
    match.summonerName
  ).mainPlayerKDA;
  var mainPlayerKills = allMatchInfo(
    match.summary,
    match.summonerName
  ).mainPlayerKills;
  var mainPlayerDeaths = allMatchInfo(
    match.summary,
    match.summonerName
  ).mainPlayerDeaths;
  var mainPlayerAssists = allMatchInfo(
    match.summary,
    match.summonerName
  ).mainPlayerAssists;
  var gameDuration = allMatchInfo(
    match.summary,
    match.summonerName
  ).gameDuration;
  var mainPlayer = allMatchInfo(match.summary, match.summonerName).mainPlayer;
  var mainPlayerVisionScore = allMatchInfo(
    match.summary,
    match.summonerName
  ).mainPlayerVisionScore;
  var mainPlayerFarmCount = allMatchInfo(
    match.summary,
    match.summonerName
  ).mainPlayerFarmCount;
  var mainPlayerFarmRate = allMatchInfo(
    match.summary,
    match.summonerName
  ).mainPlayerFarmRate;
  var killParticipation = allMatchInfo(
    match.summary,
    match.summonerName
  ).killParticipation;
  var mainPlayerSummoner1 = allMatchInfo(
    match.summary,
    match.summonerName
  ).mainPlayerSummoner1;
  var mainPlayerSummoner2 = allMatchInfo(
    match.summary,
    match.summonerName
  ).mainPlayerSummoner2;
  var rankedType;
  let background = victory ? true : false;
  switch (queueId) {
    case 420:
      rankedType = "Ranked Solo/Duo";
      break;
    case 440:
      rankedType = "Ranked Flex";
      break;
    case 490:
      rankedType = "Quick Play";
      break;
    case 450:
      rankedType = "ARAM";
      break;
    case 700:
      rankedType = "Clash";
      break;
    case 820:
      rankedType = "Co-op vs. AI Beginner";
      break;
    case 800:
      rankedType = "Co-op vs. AI Intermediate";
      break;
    case 810:
      rankedType = "Co-op vs. AI Intro";
      break;
    case 1700:
      rankedType = "Arena";
      break;
    default:
      rankedType = "Other";
      break;
  }

  return (
    <div>
      <div
        className={`z-10 relative flex flex-row rounded-lg shadow-xl ${
          victory
            ? "bg-gradient-to-r from-lime-100 via-lime-50 to-lime-100"
            : "bg-gradient-to-r from-violet-200 via-violet-100 to-violet-200"
        } h-[100px] lg:w-[900px] w-[800px] transition-all duration-200 ease-in-out transform hover:scale-[1.005] border ${
          victory ? "border-lime-100" : "border-violet-200"
        } border-[1px]`}
      >
        <div
          className={`w-[20px]  rounded-l-lg ${
            victory ? "bg-lime-500" : "bg-violet-500"
          }`}
        ></div>

        <div className="flex flex-col px-2 py-2 w-[110px]  items-center justify-center">
          <h4 className="text-slate-700 w-full text-[12px] text-center">
            {formattedGameCreationTime} {/* Insert the formatted time here */}
          </h4>

          <h4 className="text-slate-700 w-full text-[12px] text-center ">
            {victory ? "Victory" : "Defeat"}
          </h4>
          <h4 className="text-slate-700 w-full text-[12px] text-center font-bold">
            {rankedType}
          </h4>

          <h4 className="w-24 w-fill text-center text-[12px] border-t-[2px] text-slate-700 ">
            {formatGameDuration(gameDuration)}
          </h4>
        </div>
        {/*  Summoner Spells */}
        <div
          className={`flex flex-col h-full justify-center space-y-2 ml-2 ${
            queueId === 1700 ? "opacity-0" : ""
          }`}
        >
          <SummonerSpell
            currentVersion={currentVersion}
            summonerSpell={mainPlayerSummoner1}
          />
          <SummonerSpell
            currentVersion={currentVersion}
            summonerSpell={mainPlayerSummoner2}
          />
        </div>

        <div className="h-full flex justify-center items-center w-16">
          <img
            className="w-[60px] h-[56px] mx-2 rounded-[50%] border-[2px]"
            src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${champIcon}.png`}
          ></img>
        </div>

        <div className="flex flex-col justify-center space-y-2 w-[320px]  ">
          {/* Start of Items Div */}
          <div className="flex flex-row space-x-2 mt-2 justify-center w-full">
            {mainPlayer &&
              Array.from({ length: 6 }).map((_, i) => (
                <Item
                  key={i}
                  item={`http://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${
                    mainPlayer[`item${i}`]
                  }.png`}
                  type={0}
                  currentVersion = {currentVersion} 
                  itemName = {mainPlayer[`item${i}`]}
                />
              ))}
          </div>
          {/* End if Items Div */}
          <div className="flex flex-row justify-evenly items-center  w-full">
            {/* KDA */}
            <div className="flex justify-center align-middle">
              <div
                id="killsDisp"
                className="text-bold font-semibold tracking-widest text-center h-[20px] text-[15px]"
              >
                <span className="">{mainPlayerKills}</span>/
                <span className="text-red-800">{mainPlayerDeaths}</span>/
                <span>{mainPlayerAssists}</span>
              </div>
            </div>
            {/* Kill Participation */}

            <div className="flex justify-center align-middle">
              <div
                id="kdaDisp"
                className={`text-bold text-[15px] font-semibold tracking-normal text-center h-[20px] ${getKDAColor(
                  mainPlayerKDA
                )}`}
              >
                <span className="">
                  {isFinite((Math.round(mainPlayerKDA * 100) / 100).toFixed(2))
                    ? (Math.round(mainPlayerKDA * 100) / 100).toFixed(2)
                    : "Perfect"}
                </span>
              </div>
            </div>
            <div className="flex flex-row space-x-2 items-center">
              {/* Placeholder ward icon without using api */}
              <img
                className="w-8 h-8 border-[1px] rounded-md"
                src="data:image/jpeg;base64,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"
              ></img>
              <span className="text-[15px]">{mainPlayerVisionScore}</span>
            </div>
            <div>
              {/* CS/M */}
              <span className="text-[15px]">
                ({mainPlayerFarmCount}){" "}
                {(Math.round(mainPlayerFarmRate * 100) / 100).toFixed(1)}/min
              </span>
            </div>
          </div>
        </div>

        <div
          className="w-[250px] flex flex-row justify-evenly ml-auto"
          id="UsernameList"
        >
          <div className="flex flex-row justify-around w-full">
            <div
              id="BlueSide"
              className="flex flex-col w-36 text-left justify-evenly h-full py-1"
            >
              {players.slice(0, 5).map((player, index) => (
                <SummonerNameDisplay
                  key={`blue-${index}`}
                  player={player}
                  currentVersion={currentVersion}
                />
              ))}
            </div>
            <div
              id="RedSide"
              className="flex flex-col w-36 text-left justify-evenly h-full py-1"
            >
              {players.slice(5, 10).map((player, index) => (
                <SummonerNameDisplay
                  key={`red-${index}`}
                  player={player}
                  currentVersion={currentVersion}
                />
              ))}
            </div>
          </div>
        </div>
        <button
          className={`w-[30px]  rounded-r-lg ${
            victory ? "bg-lime-400" : "bg-violet-400"
          } cursor-pointer`}
          onClick={() => setOpen(!open)}
        >
          <img src={DownArrow} className="opacity-40 scale-50 "></img>
        </button>
      </div>
      <GameDetails
        opened={open}
        match={match.summary}
        mainPlayer={mainPlayer}
        currentVersion={currentVersion}
      />
    </div>
  );
};

export default GameSummary;
