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

export const getMaps = async () => {
  try {
    const response = await fetch("https://valorant-api.com/v1/maps");

    if (!response.ok) {
      throw new Error("Failed to fetch maps data");
    }

    const data = await response.json();
    console.log("API response:", data); // Log the API response
    return data;
  } catch (error) {
    console.error("Error fetching maps:", error);
    return null;
  }
};

export const getWeapons = async () => {
  try {
    const response = await fetch("https://valorant-api.com/v1/weapons");

    if (!response.ok) {
      throw new Error("Failed to fetch weapons data");
    }

    const data = await response.json();
    console.log("API response:", data); // Log the API response
    return data;
  } catch (error) {
    console.error("Error fetching weapons:", error);
    return null;
  }
};
