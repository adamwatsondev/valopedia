export const getAgents = async () => {
  try {
    const response = await fetch(
      "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch agents data");
    }

    const data = await response.json();
    console.log("API response:", data); // Log the API response
    return data;
  } catch (error) {
    console.error("Error fetching agents:", error);
    return null;
  }
};
