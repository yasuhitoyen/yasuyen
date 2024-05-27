// Import the environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetches the user info associated with a given Riot ID.
 *
 * @param {string} riotID - The Riot ID in the format "gameName#tagLine".
 * @returns {Promise<object|null>} The user info if found, otherwise null.
 */
export async function getUserInfo(riotID) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${encodeURIComponent(riotID)}`);
    if (!response.ok) {
      throw new Error("Failed to retrieve user info");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user info:", error.message);
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
      throw new Error("Failed to retrieve match details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching match details:", error.message);
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
      throw new Error("Failed to retrieve match history");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching match history:", error.message);
    return null;
  }
}

// Example usage
(async () => {
  const riotID = "mchlyn#mchly";
  const matchHistory = await getMatchHistory(riotID);
  if (matchHistory) {
    console.log("Match History:", matchHistory);
  } else {
    console.log("Failed to retrieve match history.");
  }
})();
