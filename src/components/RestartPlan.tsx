// React
import type { ReactNode } from "react";
import { useState, useEffect } from "react";

// Mantine & Icons
import { Overlay, Slider } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

// Types
type RestartProps = {
  restartPlan: string[] | undefined;
  isLoading: boolean;
  isError: boolean;
  status: string | undefined;
};

type RestartMarks =
  | {
      value: number;
      label: ReactNode;
    }[]
  | undefined;

export default function RestartPlan(restartProps: RestartProps) {
  const { restartPlan, status } = restartProps;

  const [progressVal, setProgressVal] = useState<number>(0);
  const [progressLabel, setProgressLabel] = useState<string>("");

  const [marks, setMarks] = useState<RestartMarks>([]);

  useEffect(() => {
    if (restartPlan) {
      const marks: RestartMarks = [];

      if (
        restartPlan[0] !== "00:00" &&
        restartPlan[restartPlan.length - 1] == "24:00"
      ) {
        marks.unshift({ value: 0, label: "00:00" });
      }

      restartPlan.forEach((mark) => {
        const markTime = new Date();
        markTime.setHours(
          parseInt(mark.split(":")[0]!),
          parseInt(mark.split(":")[0]!),
        );
        const hours = markTime.getHours() === 0 ? 24 : markTime.getHours();
        const minutes = hours * 60 + markTime.getMinutes();
        const percentage = (minutes / 1440) * 100;
        marks.push({ value: percentage, label: mark });
      });

      setMarks(marks);
    }
  }, [restartPlan]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (marks && marks.length > 0) {
        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const nowPercentage = (nowMinutes / 1440) * 100;
        setProgressVal(nowPercentage);

        const nextMark = marks.find((mark) => mark.value > nowPercentage);

        if (!nextMark) {
          setProgressLabel("Genstarter...");
          return;
        }

        const closetMarkTime = nextMark.label as string;

        const markTime = new Date();
        markTime.setHours(
          parseInt(closetMarkTime.split(":")[0]!),
          parseInt(closetMarkTime.split(":")[1]!),
          0,
        );

        const diffTime = Math.abs(markTime.getTime() - now.getTime());

        const h = Math.floor(diffTime / 1000 / 60 / 60);
        const m = Math.floor((diffTime / 1000 / 60 / 60 - h) * 60);
        const s = Math.floor(((diffTime / 1000 / 60 / 60 - h) * 60 - m) * 60);

        let sString = s.toString();
        let mString = m.toString();

        s < 10 ? (sString = `0${s}`) : (sString = `${s}`);
        m < 10 ? (mString = `0${m}`) : (mString = `${m}`);

        setProgressLabel(`${h} time ${mString} min ${sString} sek`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [marks]);

  return (
    <div className="relative flex w-full flex-col gap-1 self-start overflow-hidden rounded-md bg-[#1a1b1e] p-6">
      {status && <Overlay />}
      <div className="mb-4 flex justify-between">
        <div className="text-xl font-bold text-white">Genstart tidsplan</div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">
            {progressLabel === "" ? "Indlæser..." : progressLabel}
          </span>
          <IconClock className="text-white" size={23} />
        </div>
      </div>
      <Slider
        style={{ "--_bar-bg": "#1971c2 !important" }}
        className="mb-4"
        color="blue"
        label={progressLabel}
        data-disabled
        thumbSize={26}
        thumbChildren={<IconClock size="24" />}
        styles={{ thumb: { borderWidth: 0, padding: 2 } }}
        value={progressVal}
        marks={marks}
      />
    </div>
  );
}
