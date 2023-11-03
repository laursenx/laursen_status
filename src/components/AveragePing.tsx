// React
import { useState, useEffect } from "react";

// Mantine & Icons
import { Overlay, Progress } from "@mantine/core";
import { IconWifi } from "@tabler/icons-react";

// Types
type PingProps = {
  ping: string | undefined;
  isLoading: boolean;
  isError: boolean;
  status: string | undefined;
};

type PingState = "good" | "medium" | "bad" | "none";

export default function AveragePing(pingProps: PingProps) {
  const { ping, isLoading, isError, status } = pingProps;

  const [pingState, setPingState] = useState<PingState>("none");

  const pingStateLookup = {
    good: "green",
    medium: "yellow",
    bad: "red",
    none: "gray",
  };

  useEffect(() => {
    if (ping) {
      const pingInt = parseInt(ping);
      if (pingInt < 60) {
        setPingState("good");
      } else if (pingInt >= 60 && pingInt <= 75) {
        setPingState("medium");
      } else {
        setPingState("bad");
      }
    }
  }, [ping]);

  return (
    <div className="relative flex w-full flex-col gap-1 self-start overflow-hidden rounded-md bg-[#1a1b1e] p-6">
      {status && <Overlay />}
      <div className="mb-4 flex justify-between">
        <div className="text-xl font-bold text-white">Gennemsnit ping</div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">
            {isLoading
              ? "Indlæser..."
              : isError
              ? "Der opstod en fejl.."
              : `${ping} ms`}
          </span>
          <IconWifi className="text-white" size={23} />
        </div>
      </div>
      <Progress color={pingStateLookup[pingState]} value={100} />
    </div>
  );
}
