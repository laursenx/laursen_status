// React
import { useState, useEffect } from "react";

// Mantine & Icons
import { Overlay, Progress } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";

// Types
type PlayerCountProps = {
  players: number | undefined;
  maxPlayers: string | undefined;
  isLoading: boolean;
  isError: boolean;
  status: string | undefined;
};

export default function PlayerCounter(playerProps: PlayerCountProps) {
  const { players, maxPlayers, isLoading, isError, status } = playerProps;

  const [progressVal, setProgressVal] = useState<number>(0);

  useEffect(() => {
    if (players && maxPlayers) {
      setProgressVal((players / parseInt(maxPlayers)) * 100);
    }
  }, [players, maxPlayers]);

  return (
    <div className="relative flex w-full flex-col gap-1 self-start overflow-hidden rounded-md bg-[#1a1b1e] p-6">
      {status && <Overlay />}
      <div className="mb-4 flex justify-between">
        <div className="text-xl font-bold text-white">Spillere online</div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">
            {isLoading
              ? "Indlæser..."
              : isError
              ? "Der opstod en fejl.."
              : `${players}/${maxPlayers}`}
          </span>
          <IconUsers className="text-white" size={22} />
        </div>
      </div>
      <Progress value={progressVal} />
    </div>
  );
}
