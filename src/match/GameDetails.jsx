import DamageBar from "./DamageBar";
import { allMatchInfo } from "../scripts/MatchDetails";
import React, { useState } from "react";
import DetailedSummonerNameDisplay from "./DetailedSummonerNameDisplay";
import GameDetailsItems from "./GameDetailsItems";
import AccomplishmentTile from "./AccomplishmentTile";
import HatTrickIcon from "../assets/icons/HatTrickIcon2.png";
const GameDetails = (props) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  const opened = props.opened;
  const victory = props.mainPlayer == null ? false : props.mainPlayer.win;
  const match = props.match;
  const currentVersion = props.currentVersion;

  const getMaxPlayerDetails = (teamPlayers) => {
    let maxDamage = 0;
    let maxDamagePlayer = null;
    let maxKillParticipation = 0;
    let maxKillParticipationPlayer = null;
    let maxBuildingDamage = 0;
    let maxBuildingDamagePlayer = null;

    teamPlayers.forEach((player) => {
      const damage = player.totalDamageDealtToChampions;
      const assists = player.assists;
      const kills = player.kills;
      const buildingDamage = player.damageDealtToBuildings;

      if (damage > maxDamage) {
        maxDamage = damage;
        maxDamagePlayer = player;
      }

      if (assists + kills > maxKillParticipation) {
        maxKillParticipation = assists + kills;
        maxKillParticipationPlayer = player;
      }

      if (buildingDamage > maxBuildingDamage) {
        maxBuildingDamage = buildingDamage;
        maxBuildingDamagePlayer = player;
      }
    });

    return {
      maxDamagePlayer,
      maxKillParticipationPlayer,
      maxBuildingDamagePlayer,
    };
  };

  const determineTitle = (teamDetails) => {
    const players = [
      teamDetails.maxDamagePlayer,
      teamDetails.maxKillParticipationPlayer,
      teamDetails.maxBuildingDamagePlayer,
    ];

    const playerCounts = players.reduce((acc, player) => {
      if (!player) return acc;
      acc[player.summonerName] = (acc[player.summonerName] || 0) + 1;
      return acc;
    }, {});

    const values = Object.values(playerCounts);

    if (values.includes(3)) {
      return (
        <div className="title-container flex flex-row justify-center items-center">
          <img src={HatTrickIcon} className="w-[22px] h-[22px]" draggable="false"></img>
          <h4 className="text-center text-md ">Hat Trick</h4>
          <img src={HatTrickIcon} className="w-[22px] h-[22px]" draggable="false"></img>
        </div>
      );
    } else if (values.includes(2)) {
      return (
        <div className="title-container">
          <h4 className="text-center text-md">⚔️ Double Threat ⚔️</h4>
        </div>
      );
    } else {
      return (
        <div className="title-container">
          <h4 className="text-center text-md">🥉 Trio Conquest 🥉</h4>
        </div>
      );
    }
  };

  if (props.mainPlayer) {
    const allMatchDetails = allMatchInfo(match, props.mainPlayer.summonerName);

    const players = match.info.participants;
    const blueSideDetails = getMaxPlayerDetails(players.slice(0, 5));
    const redSideDetails = getMaxPlayerDetails(players.slice(5, 10));
    const blueSideTitle = determineTitle(blueSideDetails);
    const redSideTitle = determineTitle(redSideDetails);

    const handleMouseEnter = (e, kills, deaths, assists) => {
      const kdaRatio = ((kills + assists) / (deaths || 1)).toFixed(2);
      setTooltip({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        text: `KDA Ratio: ${kdaRatio}`,
      });
    };

    const handleMouseLeave = () => {
      setTooltip({ visible: false, x: 0, y: 0, text: "" });
    };

    const handleMouseMove = (e) => {
      setTooltip((prevState) => ({
        ...prevState,
        x: e.clientX,
        y: e.clientY,
      }));
    };

    return (
      <>
        <div
          className={`transition-all z-0 ${
            opened ? "" : "translate-y-[-100%] hidden"
          } flex flex-row rounded-lg shadow-xl ${
            victory
              ? "bg-gradient-to-r from-lime-100 via-lime-50 to-lime-100"
              : "bg-gradient-to-r from-violet-200 via-violet-100 to-violet-200"
          } h-[420px] lg:w-[900px] w-[800px] transition-all duration-200 ease-in-out transform border ${
            victory ? "border-lime-100" : "border-violet-200"
          } border-[1px] mt-1`}
        >
          <div className="flex flex-col justify-between w-full h-full">
            <div id="BlueSide" className="flex flex-col w-full">
              <div className="flex flex-row justify-evenly h-full relative">
                <div className="flex flex-col justify-center">
                  {players.slice(0, 5).map((player, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-start items-center"
                    >
                      <div className="flex flex-row justify-start w-[160px]">
                        <DetailedSummonerNameDisplay
                          player={player}
                          currentVersion={currentVersion}
                        />
                      </div>

                      <div>
                        <GameDetailsItems
                          className="ml-auto"
                          player={player}
                          currentVersion={currentVersion}
                        />
                      </div>
                      <div
                        className="w-[70px] flex flex-row justify-center tracking-tight"
                        onMouseEnter={(e) =>
                          handleMouseEnter(
                            e,
                            allMatchDetails.allPlayersKills[index],
                            allMatchDetails.allPlayersDeaths[index],
                            allMatchDetails.allPlayersAssists[index]
                          )
                        }
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                      >
                        <h4 className="text-slate-500">
                          {allMatchDetails.allPlayersKills[index]}/
                          {allMatchDetails.allPlayersDeaths[index]}/
                          {allMatchDetails.allPlayersAssists[index]}
                        </h4>
                      </div>
                      <div className="text-sm text-center text-gray-600">
                        <DamageBar
                          physicalDmg={
                            allMatchDetails.allPlayersPhysicalDmgDealt[index]
                          }
                          magicDmg={
                            allMatchDetails.allPlayersMagicDmgDealt[index]
                          }
                          trueDmg={
                            allMatchDetails.allPlayersTrueDmgDealt[index]
                          }
                          maxDmg={Math.max(
                            ...allMatchDetails.allPlayersTotalDmgDealt.slice(
                              0,
                              5
                            )
                          )}
                        ></DamageBar>
                        {numberWithCommas(
                          allMatchDetails.allPlayersTotalDmgDealt[index]
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-full flex-col">
                  {blueSideTitle}
                  <div className="flex flex-row space-x-5 h-full">
                    <AccomplishmentTile
                      player={blueSideDetails.maxDamagePlayer}
                      type="dmg"
                      currentVersion={currentVersion}
                    />
                    <AccomplishmentTile
                      player={blueSideDetails.maxKillParticipationPlayer}
                      type="ast"
                      currentVersion={currentVersion}
                    />
                    <AccomplishmentTile
                      player={blueSideDetails.maxBuildingDamagePlayer}
                      type="bld"
                      currentVersion={currentVersion}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="RedSide" className="flex flex-col w-full">
              <div className="flex flex-row justify-evenly h-full py-1 relative">
                <div className="h-full flex-col">
                  {redSideTitle}
                  <div className="flex flex-row space-x-5 h-full">
                    <AccomplishmentTile
                      player={redSideDetails.maxDamagePlayer}
                      type="dmg"
                      currentVersion={currentVersion}
                    />
                    <AccomplishmentTile
                      player={redSideDetails.maxKillParticipationPlayer}
                      type="ast"
                      currentVersion={currentVersion}
                    />
                    <AccomplishmentTile
                      player={redSideDetails.maxBuildingDamagePlayer}
                      type="bld"
                      currentVersion={currentVersion}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  {players.slice(5, 10).map((player, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-end items-center"
                    >
                      <div className="text-sm text-center text-gray-600">
                        <DamageBar
                          physicalDmg={
                            allMatchDetails.allPlayersPhysicalDmgDealt[
                              index + 5
                            ]
                          }
                          magicDmg={
                            allMatchDetails.allPlayersMagicDmgDealt[index + 5]
                          }
                          trueDmg={
                            allMatchDetails.allPlayersTrueDmgDealt[index + 5]
                          }
                          maxDmg={Math.max(
                            ...allMatchDetails.allPlayersTotalDmgDealt.slice(
                              5,
                              10
                            )
                          )}
                        ></DamageBar>
                        {numberWithCommas(
                          allMatchDetails.allPlayersTotalDmgDealt[5 + index]
                        )}
                      </div>

                      <div
                        className="w-[70px] flex flex-row justify-center tracking-tight"
                        onMouseEnter={(e) =>
                          handleMouseEnter(
                            e,
                            allMatchDetails.allPlayersKills[index + 5],
                            allMatchDetails.allPlayersDeaths[index + 5],
                            allMatchDetails.allPlayersAssists[index + 5]
                          )
                        }
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                      >
                        <h4 className="text-slate-500">
                          {allMatchDetails.allPlayersKills[index + 5]}/
                          {allMatchDetails.allPlayersDeaths[index + 5]}/
                          {allMatchDetails.allPlayersAssists[index + 5]}
                        </h4>
                      </div>
                      <div>
                        <GameDetailsItems
                          className="ml-auto"
                          player={player}
                          currentVersion={currentVersion}
                        />
                      </div>
                      <div className="flex flex-row justify-end w-[160px]">
                        <DetailedSummonerNameDisplay
                          player={player}
                          currentVersion={currentVersion}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {tooltip.visible && (
          <div
            className="fixed bg-gray-700 text-white text-xs px-2 py-1 rounded"
            style={{ top: tooltip.y + 20, left: tooltip.x + 20 }}
          >
            {tooltip.text}
          </div>
        )}
      </>
    );
  }
  return null;
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default GameDetails;
