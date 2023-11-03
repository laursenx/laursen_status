import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { fetchPlayers, fetchStatus } from "@/utils/fivem";

export const fivemRouter = createTRPCRouter({
  status: publicProcedure.query(async () => {
    const { status, clients, sv_maxclients } = await fetchStatus();
    const players = await fetchPlayers();

    const averagePing =
      clients > 0
        ? (players.reduce((acc, cur) => acc + cur.ping, 0) / clients).toFixed(0)
        : 0;

    let restartPlan = process.env.RESTART_PLAN!;
    restartPlan = restartPlan.replace(/'/g, '"');

    const parsedRestartPlan = JSON.parse(restartPlan) as string[];

    return {
      players: clients,
      maxPlayers: sv_maxclients,
      ping: averagePing,
      restartPlan: parsedRestartPlan,
      status: status,
    };
  }),
});
