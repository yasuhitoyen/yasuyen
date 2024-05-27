import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import CrownSplash from "./assets/CrownSplash.png";
import BestChampBackground from "./assets/BestChampBackground.png";
import { allMatchInfo } from "./scripts/MatchDetails";

import {
  Iron,
  Bronze,
  Silver,
  Gold,
  Platinum,
  Emerald,
  Diamond,
  Master,
  Grandmaster,
  Challenger,
} from "./assets";

const tierImages = {
  IRON: Iron,
  BRONZE: Bronze,
  SILVER: Silver,
  GOLD: Gold,
  PLATINUM: Platinum,
  EMERALD: Emerald,
  DIAMOND: Diamond,
  MASTER: Master,
  GRANDMASTER: Grandmaster,
  CHALLENGER: Challenger,
};

const tierStyles = {
  IRON: {
    background: "bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700",
    borderGradient: "bg-gradient-to-r from-gray-400 to-gray-700",
    size: "scale-[100%]",
    marginTop: "mt-[-5px]",
  },
  BRONZE: {
    background: "bg-gradient-to-r from-orange-500 via-red-500 to-orange-500",
    borderGradient: "bg-gradient-to-r from-red-500 to-orange-500",
    size: "scale-[115%]",
    marginTop: "mt-[5px]",
  },
  SILVER: {
    background: "bg-gradient-to-r from-gray-200 via-blue-200 to-gray-200",
    borderGradient: "bg-gradient-to-r from-blue-200 to-gray-200",
    size: "scale-[110%]",
    marginTop: "mt-[5px]",
  },
  GOLD: {
    background: "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400",
    borderGradient: "bg-gradient-to-r from-orange-400 to-yellow-400",
    size: "scale-[115%]",
    marginTop: "mt-[-15px]",
  },
  PLATINUM: {
    background: "bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-400",
    borderGradient: "bg-gradient-to-r from-cyan-500 to-teal-400",
    size: "scale-[120%]",
    marginTop: "mt-[-10px]",
  },
  EMERALD: {
    background: "bg-gradient-to-r from-green-400 via-lime-400 to-green-400",
    borderGradient: "bg-gradient-to-r from-lime-400 to-green-400",
    size: "scale-[130%]",
    marginTop: "mt-[-15px]",
  },
  DIAMOND: {
    background: "bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400",
    borderGradient: "bg-gradient-to-r from-purple-400 to-blue-400",
    size: "scale-[130%]",
    marginTop: "mt-[-25px]",
  },
  MASTER: {
    background: "bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400",
    borderGradient: "bg-gradient-to-r from-pink-400 to-purple-400",
    size: "scale-[120%]",
    marginTop: "mt-[-50px]",
  },
  GRANDMASTER: {
    background: "bg-gradient-to-r from-red-400 via-yellow-400 to-red-400",
    borderGradient: "bg-gradient-to-r from-yellow-400 to-red-400",
    size: "scale-[130%]",
    marginTop: "mt-[-85px]",
  },
  CHALLENGER: {
    background: "bg-gradient-to-r from-blue-100 via-yellow-100 to-blue-100",
    borderGradient: "bg-gradient-to-r from-yellow-100 to-blue-100",
    size: "scale-[130%]",
    marginTop: "mt-[-85px]",
  },
  DEFAULT: {
    background: "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400",
    borderGradient: "bg-gradient-to-r from-gray-300 to-gray-200",
    size: "scale-[200%]",
    marginTop: "mt-[47px]",
  },
};

const BestChampPanel = (props) => {
  const { rankedStats, bestChampion, matchHistory, riotID } = props;
  let tierImage = null;
  let tier = null;
  let division = null;
  let wins = null;
  let losses = null;
  let winRate = null;

  if (rankedStats && rankedStats[0] && rankedStats.length !== 0) {
    tier = rankedStats[0].tier; // Ensure you use the correct tier here
    tierImage = tierImages[tier];
    division = rankedStats[0].rank;
    wins = rankedStats[0].wins;
    losses = rankedStats[0].losses;
    winRate = ((wins / (wins + losses)) * 100).toFixed(2);
  }

  const userData = [];
  if (matchHistory && matchHistory.length > 0) {
    matchHistory.forEach((match) => {
      match.info.participants.forEach((participant) => {
        if (
          (participant.riotIdGameName + "#" + participant.riotIdTagline)
            .toLowerCase()
            .trim() === riotID.toLowerCase().trim()
        ) {
          userData.push(participant);
        }
      });
    });
  }

  // Calculate additional stats
  let averageDamage = 0;
  let averageKills = 0;
  let averageDeaths = 0;
  let averageAssists = 0;
  let recentNWinRate = 0;
  const N = userData.length; // Number of recent games to calculate win rate for
  if (userData.length > 0) {
    const recentGames = userData.slice(0, N);
    let recentWins = 0;
    let totalDamage = 0;
    let totalKills = 0;
    let totalDeaths = 0;
    let totalAssists = 0;

    recentGames.forEach((game) => {
      totalDamage += game.totalDamageDealtToChampions;
      totalKills += game.kills;
      totalDeaths += game.deaths;
      totalAssists += game.assists;
      if (game.win) {
        recentWins += 1;
      }
    });

    averageDamage = (totalDamage / recentGames.length).toFixed(0);
    averageKills = (totalKills / recentGames.length).toFixed(1);
    averageDeaths = (totalDeaths / recentGames.length).toFixed(1);
    averageAssists = (totalAssists / recentGames.length).toFixed(1);
    recentNWinRate = ((recentWins / recentGames.length) * 100).toFixed(1);
  }

  const winRateData = {
    labels: ["Wins", "Losses"],
    datasets: [
      {
        label: "Win Rate",
        data: [wins, losses],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#333"],
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: false, // Hides the legend labels
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw || 0;
            const percentage = ((value / (wins + losses)) * 100).toFixed(2);
            return `${value} (${percentage}%)`;
          },
        },
      },
    },
    elements: {
      arc: {
        borderColor: "#333",
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const tierStyle = tier
    ? tierStyles[tier.toUpperCase()] || tierStyles.DEFAULT
    : tierStyles.DEFAULT;

  return (
    <div
      className={`select-none lg:flex flex-col justify-start items-center pt-[20px] mx-5 rounded-xl shadow-lg w-[250px] h-[600px] lg:scale-[75%] scale-[60%] relative transition-all duration-200 lg:visible content-center`}
      style={{
        backgroundImage: `url(${BestChampBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-60 rounded-xl z-0"></div>

      {/* Champion Image */}
      <div className={`w-full h-40 relative flex z-10  align-middle justify-center`}>
        <div className={`${tierStyle.size} ${tierStyle.marginTop}`}>
          {tierImage && <img src={tierImage} className=" z-10 " alt={tier} />}
        </div>

        <img
          src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${bestChampion}.png`}
          className="rounded-full w-[155px] h-[55ppx] z-20 absolute border-[0px] border-yellow-400"
          style={{ top: "5%", zIndex: 20 }} // Adjust top as necessary to position at the top of the div
        />
      </div>

      {/** Tier Display (e.g., PLATINUM II) */}
      <div className="w-full h-30 flex flex-col justify-center items-center">
        <div className={`relative h-[50px] mt-[120px] rounded-full ${tierStyle.borderGradient}`}>
          <div
            className={`hover:scale-[105%] transition-all duration-200 w-full h-full flex items-center justify-center text-[25px] text-black z-10 rounded-full ${tierStyle.background} px-4 font-semibold`}
          >
            {tier ? (
              <h4 className="font-poppins">
                {tier} {division}
              </h4>
            ) : (
              <h4 className="font-poppins">Unranked</h4>
            )}
          </div>
        </div>

        {/* New Stats Section */}
        <div className="mt-[20px] w-full h-[250px] text-center text-[18px] text-black z-10 font-poppins flex flex-col justify-between pb-[20px]">
          {wins !== null && losses !== null && (
            <>
              <h4>
                Wins: {wins} Losses: {losses}
              </h4>
              {/* Pie Chart */}
              <div className="w-full text-center text-[18px] text-black z-10 h-[70px]">
                <Pie data={winRateData} options={pieOptions} />
              </div>
              <h4>Win Rate: {winRate}%</h4>
            </>
          )}
          <h4 className=" font-poppins">
            Avg K/D/A: {averageKills} / {averageDeaths} / {averageAssists}
          </h4>
          <h4 className=" font-poppins">
            Avg Damage: {parseInt(averageDamage).toLocaleString()}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BestChampPanel;
