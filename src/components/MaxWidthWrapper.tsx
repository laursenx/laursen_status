import type { PropsWithChildren } from "react";

export default function MaxWidthWrapper({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-5 md:px-14">
      {children}
    </div>
  );
}
