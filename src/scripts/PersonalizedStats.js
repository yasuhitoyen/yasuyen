// Import the environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function getRecentChampion(history, username) {
  let playedChamps = [];

  for (let hInd in history) {
    if (history[hInd]) {
      let players = history[hInd].info.participants;
      for (let pInd in players) {
        if (
          username.trim().toLowerCase() ===
          (players[pInd].riotIdGameName + "#" + players[pInd].riotIdTagline).trim().toLowerCase()
        ) {
          playedChamps.push(players[pInd].championName);
        }
      }
    }
  }
  // Count the occurrences of each champion
  const champCounts = playedChamps.reduce((acc, champion) => {
    acc[champion] = acc[champion] ? acc[champion] + 1 : 1;
    return acc;
  }, {});

  // Find the champion with the highest count
  let mostCommonChampion = null;
  let maxCount = 0;
  for (const champion in champCounts) {
    if (champCounts[champion] > maxCount) {
      mostCommonChampion = champion;
      maxCount = champCounts[champion];
    }
  }

  return mostCommonChampion; // Return the most common champion
}

export async function getRankedStats(riotId) {
  // Use the environment variable for the API base URL
  const response = await fetch(`${API_BASE_URL}/summoner/${encodeURIComponent(riotId)}`);
  if (!response.ok) {
    const errorData = await response.json();
    return { error: errorData.message || "User does not exist" };
  }
  const data = await response.json();
  return data.rankedStats;
}
