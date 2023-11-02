export type PlayersJsonType = {
  endpoint: string;
  id: number;
  identifiers: string[];
  name: string;
  ping: number;
};

export type ServerStatusType = {
  clients: number;
  gametype: string;
  hostname: string;
  iv: string;
  mapname: string;
  sv_maxclients: string;
  status: string | undefined;
};
