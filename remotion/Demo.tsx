import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const DEMO_FPS = 30;
export const DEMO_DURATION = 240;
export const DEMO_WIDTH = 960;
export const DEMO_HEIGHT = 720;
export const PACKET_FRAME = 215;

const INK = "#1e293b";
const MUTED = "#64748b";
const LINE = "#cbd5e1";
const IDLE = "#94a3b8";
const DISPLAY = 34;
const BODY = 22;

const PROMPTS_PER_RUN = 424;
const BURST_REQUESTS = PROMPTS_PER_RUN * 5;

const BURSTS = [
  { day: 3, date: "Oct 03 14:02", commit: "4e1a9c2", run: 812 },
  { day: 9, date: "Oct 09 09:41", commit: "b07d3f8", run: 829 },
  { day: 16, date: "Oct 16 17:26", commit: "91c5e0a", run: 851 },
  { day: 22, date: "Oct 22 11:13", commit: "d3a86b4", run: 866 },
  { day: 28, date: "Oct 28 15:50", commit: "6fb2c17", run: 884 },
];

const DAYS = 31;
const BASELINE = [
  18, 22, 0, 20, 16, 24, 19, 21, 0, 17, 23, 20, 18, 22, 19, 0, 21, 16, 24, 20,
  18, 0, 22, 19, 17, 23, 20, 0, 21, 18, 22,
];

const CHART_HEIGHT = 150;
const SPIKE_START = 20;
const MATCH_START = 80;
const MATCH_STEP = 22;
const SUMMARY_START = 190;
const FADE_START = 226;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export function Demo() {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [FADE_START, DEMO_DURATION - 1], [1, 0], clamp);
  const matchedCount = BURSTS.filter(
    (_, i) => frame >= MATCH_START + i * MATCH_STEP + 8,
  ).length;
  const summary = interpolate(
    frame,
    [SUMMARY_START, SUMMARY_START + 12],
    [0, 1],
    clamp,
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#ffffff",
        color: INK,
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
        fontSize: BODY,
        fontVariantNumeric: "tabular-nums",
        padding: 36,
      }}
    >
      <div style={{ opacity: fade, display: "flex", flexDirection: "column", height: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: DISPLAY, fontWeight: 600, letterSpacing: "-0.02em" }}>
            Sample evidence packet
          </div>
          <div style={{ color: MUTED }}>Illustrative data</div>
        </div>

        <div style={{ color: MUTED, marginTop: 18 }}>
          Requests per day on your key, from your usage export
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 6,
            height: CHART_HEIGHT,
            marginTop: 10,
            borderBottom: `2px solid ${LINE}`,
          }}
        >
          {Array.from({ length: DAYS }, (_, d) => {
            const burstIndex = BURSTS.findIndex((b) => b.day === d + 1);
            const isBurst = burstIndex >= 0;
            const grow = isBurst
              ? interpolate(
                  frame,
                  [SPIKE_START + burstIndex * 9, SPIKE_START + burstIndex * 9 + 10],
                  [0, 1],
                  clamp,
                )
              : interpolate(frame, [0, 14], [0, 1], clamp);
            const matched =
              isBurst && frame >= MATCH_START + burstIndex * MATCH_STEP;
            return (
              <div
                key={d}
                style={{
                  flex: 1,
                  height: (isBurst ? CHART_HEIGHT - 8 : BASELINE[d]) * grow,
                  backgroundColor: matched ? INK : isBurst ? IDLE : LINE,
                }}
              />
            );
          })}
        </div>

        <div style={{ marginTop: 12, flex: 1 }}>
          {BURSTS.map((b, i) => {
            const start = MATCH_START + i * MATCH_STEP;
            const appear = interpolate(frame, [start, start + 8], [0, 1], clamp);
            const check = interpolate(frame, [start + 8, start + 14], [0, 1], clamp);
            return (
              <div
                key={b.commit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 52,
                  borderBottom: `1px solid ${LINE}`,
                  opacity: appear,
                  transform: `translateY(${(1 - appear) * 10}px)`,
                }}
              >
                <div style={{ width: 190 }}>{b.date}</div>
                <div style={{ width: 210 }}>
                  {BURST_REQUESTS.toLocaleString("en-US")} requests
                </div>
                <div style={{ width: 210 }}>commit {b.commit}</div>
                <div style={{ width: 170 }}>CI run #{b.run}</div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 6,
                    fontWeight: 600,
                    opacity: check,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10.5l4 4 8-9"
                      stroke={INK}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Match
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            backgroundColor: INK,
            color: "#ffffff",
            borderRadius: 12,
            padding: "16px 22px",
            marginTop: 14,
          }}
        >
          <div style={{ fontWeight: 600 }}>
            {matchedCount} of {BURSTS.length} bursts matched to a commit and a
            CI run
          </div>
          <div style={{ opacity: summary, marginTop: 4 }}>
            Same {PROMPTS_PER_RUN} prompt hashes in every burst. Prompt text in
            packet: none.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
