// Mantine & Icons
import { Button } from "@mantine/core";

// Components
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Navbar({
  title,
  cfxId,
  website,
  discord,
}: {
  title: string;
  cfxId: string;
  website: string | undefined;
  discord: string | undefined;
}) {
  const connectToServer = () => {
    location.href = `fivem://connect/cfx.re/join/${cfxId}`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#1a1b1e]">
      <MaxWidthWrapper>
        <div className="flex h-20">
          <div className="mr-auto flex h-full items-center gap-5">
            <div className="text-2xl font-bold text-white">{title}</div>
            <div className="flex items-center gap-4">
              {website && <a href={website}>Hjemmeside</a>}
              {discord && <a href={discord}>Discord</a>}
            </div>
          </div>
          <div className="flex h-full items-center">
            <Button onClick={() => connectToServer()} variant="light">
              Tilslut Server
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
