"use client";

import { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import {
  Demo,
  DEMO_DURATION,
  DEMO_FPS,
  DEMO_HEIGHT,
  DEMO_WIDTH,
  PACKET_FRAME,
} from "@/remotion/Demo";

export function DemoPlayer() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white">
      <Player
        key={reducedMotion ? "still" : "playing"}
        component={Demo}
        durationInFrames={DEMO_DURATION}
        fps={DEMO_FPS}
        compositionWidth={DEMO_WIDTH}
        compositionHeight={DEMO_HEIGHT}
        autoPlay={!reducedMotion}
        loop
        initiallyMuted
        controls={false}
        acknowledgeRemotionLicense
        initialFrame={reducedMotion ? PACKET_FRAME : 0}
        style={{ width: "100%" }}
      />
    </div>
  );
}
