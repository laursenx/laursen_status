import type { PlayersJsonType, ServerStatusType } from "@/types/FivemTypes";

const serverIp = process.env.FIVEM_IP;
const serverPort = process.env.FIVEM_PORT;

export async function fetchPlayers() {
  try {
    const response = await fetch(
      `http://${serverIp}:${serverPort}/players.json`,
    );

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as PlayersJsonType[];

    return data;
  } catch (e) {
    return [];
  }
}

export async function fetchStatus() {
  try {
    const response = await fetch(
      `http://${serverIp}:${serverPort}/dynamic.json`,
    );

    if (!response.ok) {
      return {
        status: "offline",
        clients: 0,
        sv_maxclients: "0",
      };
    }

    const data = (await response.json()) as ServerStatusType;

    return data;
  } catch (e) {
    return {
      status: "offline",
      clients: 0,
      sv_maxclients: "0",
    };
  }
}
