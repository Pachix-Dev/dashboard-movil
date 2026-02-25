export async function getLatestGames() {
  const LATEST_GAMES = "https://www.freetogame.com/api/games";
  try {
    const rawData = await fetch(LATEST_GAMES);
    if (!rawData.ok) {
      throw new Error(`HTTP error! status: ${rawData.status}`);
    }
    const json = await rawData.json();      
    return json;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}
