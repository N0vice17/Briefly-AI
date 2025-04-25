import { cn } from "@/lib/utils";
import React from "react";

export function GridBackground() {
  return (
    <div
      className="relative flex flex-col h-screen w-screen items-center justify-center bg-black dark:bg-white brightness-120">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]"
        )} />
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-white"></div>
      <p
        className="relative z-20 bg-white from-neutral-700 to-neutral-400 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        Briefly AI
      </p>
    </div>
  );
}
