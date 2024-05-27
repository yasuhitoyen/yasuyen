export function allMatchInfo(match, riotID) {
  let players = match.info.participants;
  
  var victory = "null";
  var champIcon = "";
  var queueId = match.info.queueId;
  var gameDuration = match.info.gameDuration;
  var killParticipation = 0;
  var mainPlayer;
  var totalKills = 0;
  var teamId;
  var mainPlayerInd;
  var mainPlayerKills;
  var mainPlayerDeaths;
  var mainPlayerAssists;
  var mainPlayerSummoner1;
  var mainPlayerSummoner2;
  var mainPlayerKDA;
  var mainPlayerVisionScore;
  var mainPlayerFarmCount;
  var mainPlayerFarmRate;
  var allPlayersTotalDmgDealt = [];
  var allPlayersMagicDmgDealt = [];
  var allPlayersPhysicalDmgDealt = [];
  var allPlayersTrueDmgDealt = [];
  var allPlayersKills = [];
  var allPlayersDeaths = [];
  var allPlayersAssists = [];
  for (let pInd in players) {
    allPlayersTotalDmgDealt.push(players[pInd].totalDamageDealtToChampions);
    allPlayersMagicDmgDealt.push(players[pInd].magicDamageDealtToChampions);
    allPlayersPhysicalDmgDealt.push(players[pInd].physicalDamageDealtToChampions);
    allPlayersTrueDmgDealt.push(players[pInd].trueDamageDealtToChampions)
    allPlayersKills.push(players[pInd].kills);
    allPlayersDeaths.push(players[pInd].deaths);
    allPlayersAssists.push(players[pInd].assists);

    if (riotID.trim().toLowerCase() === (players[pInd].riotIdGameName + "#" + players[pInd].riotIdTagline).trim().toLowerCase()) {
      mainPlayerInd = pInd;
      mainPlayer = players[mainPlayerInd];
      teamId = mainPlayer.teamId;
      victory = mainPlayer.win;
      champIcon = mainPlayer.championName;
      mainPlayerKills = mainPlayer.kills;
      mainPlayerDeaths = mainPlayer.deaths;
      mainPlayerAssists = mainPlayer.assists;
      mainPlayerKDA =
        (mainPlayer.kills + mainPlayer.assists) / mainPlayer.deaths;
      mainPlayerSummoner2 = mainPlayer.summoner2Id;
      mainPlayerSummoner1 = mainPlayer.summoner1Id;
      mainPlayerVisionScore = mainPlayer.visionScore;
      mainPlayerFarmCount = mainPlayer.totalMinionsKilled + mainPlayer.neutralMinionsKilled;
      mainPlayerFarmRate = mainPlayerFarmCount / (gameDuration / 60);
    }
  }

  for (let pInd in players) {
    if (players[pInd].teamId == teamId) {
      totalKills += players[pInd].kills;
    }
  }

  if (!totalKills) killParticipation = 1;
  else killParticipation = (mainPlayer.kills + mainPlayer.assists) / totalKills;
  return {
    players: players,
    victory: victory,
    champIcon: champIcon,
    queueId: queueId,
    gameDuration: gameDuration,
    killParticipation: killParticipation,
    mainPlayer: mainPlayer,
    totalKills: totalKills,
    teamId: teamId,
    mainPlayerKills: mainPlayerKills,
    mainPlayerDeaths: mainPlayerDeaths,
    mainPlayerAssists: mainPlayerAssists,
    mainPlayerSummoner1: mainPlayerSummoner1,
    mainPlayerSummoner2: mainPlayerSummoner2,
    mainPlayerKDA: mainPlayerKDA,
    mainPlayerVisionScore: mainPlayerVisionScore,
    mainPlayerFarmCount: mainPlayerFarmCount,
    mainPlayerFarmRate: mainPlayerFarmRate,
    allPlayersKills: allPlayersKills,
    allPlayersDeaths: allPlayersDeaths,
    allPlayersAssists: allPlayersAssists,
    allPlayersPhysicalDmgDealt: allPlayersPhysicalDmgDealt, 
    allPlayersMagicDmgDealt: allPlayersMagicDmgDealt, 
    allPlayersTrueDmgDealt: allPlayersTrueDmgDealt, 
    allPlayersTotalDmgDealt: allPlayersTotalDmgDealt,

  };
}
export function getKillParticipation(match, username) {
  return Math.round(allMatchInfo(match, username).killParticipation * 100);
}
