// Import the environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetches the PUUID associated with a given Riot ID (gameName + tagLine).
 *
 * @param {string} riotID - The Riot ID in the format "gameName#tagLine".
 * @returns {Promise<string|null>} The PUUID if found, otherwise null.
 */
export async function getPUUID(riotID) {
  console.log(`getPUUID called with riotID: ${riotID}`);
  try {
    const [gameName, tagLine] = riotID.split("#");
    if (!gameName || !tagLine) {
      throw new Error("Invalid Riot ID format");
    }
    const response = await fetch(`${API_BASE_URL}/user/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`);
    if (!response.ok) {
      console.log(`Error: ${response.status} ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    return data.puuid;
  } catch (error) {
    console.error("Error fetching PUUID:", error);
    return null;
  }
}

/**
 * Fetches match history for a given Riot ID.
 *
 * @param {string} riotID - The Riot ID in the format "gameName#tagLine".
 * @returns {Promise<Array|null>} The match details if found, otherwise null.
 */
export async function getMatchHistory(riotID) {
  try {
    const response = await fetch(`${API_BASE_URL}/match-history/${encodeURIComponent(riotID)}`);
    if (!response.ok) {
      console.log(`Error: ${response.status} ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching match history:", error);
    return null;
  }
}

/**
 * Fetches match details for a given match ID.
 *
 * @param {string} matchId - The match ID.
 * @returns {Promise<object|null>} The match details if found, otherwise null.
 */
export async function getMatchDetails(matchId) {
  try {
    const response = await fetch(`${API_BASE_URL}/match-details/${encodeURIComponent(matchId)}`);
    if (!response.ok) {
      console.log(`Error: ${response.status} ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    console.log(`Response Data: ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    console.error("Error fetching match details:", error);
    return null;
  }
}

// Example usage
(async () => {
  const riotID = 'mchlyn#mchly';
  try {
    // Fetch PUUID
    const puuid = await getPUUID(riotID);
    if (puuid) {
      console.log(`PUUID for ${riotID}: ${puuid}`);

      // Fetch match history using PUUID
      const matchHistory = await getMatchHistory(riotID);
      if (matchHistory) {
        console.log("Match History:", matchHistory);
      } else {
        console.log('Failed to retrieve match history.');
      }
    } else {
      console.log('Failed to retrieve PUUID.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
