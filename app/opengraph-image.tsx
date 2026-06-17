import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

import { ImageResponse } from "next/og"

export const alt = "Victor Santos — Software Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const INK = "#141414"
const CREAM = "#f1ece0"
const MUTED = "#8b8780"

export default async function Image() {
  const [spaceGrotesk, jetbrainsMono] = await Promise.all([
    readFile(fileURLToPath(new URL("./fonts/SpaceGrotesk-Bold.ttf", import.meta.url))),
    readFile(
      fileURLToPath(new URL("./fonts/JetBrainsMono-Regular.ttf", import.meta.url))
    ),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: INK,
          color: CREAM,
          padding: "0 96px",
          fontFamily: "JetBrains Mono",
        }}
      >
        {/* CRT scanlines */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
          }}
        />

        <div style={{ display: "flex", fontSize: 30, color: MUTED }}>
          # portfolio
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 28,
            fontFamily: "Space Grotesk",
            fontWeight: 700,
            fontSize: 132,
            lineHeight: 0.94,
            letterSpacing: "-0.04em",
          }}
        >
          <span>VICTOR</span>
          <span>SANTOS</span>
        </div>

        <div style={{ display: "flex", marginTop: 32, fontSize: 38, color: MUTED }}>
          Software Engineer
        </div>

        <div style={{ display: "flex", marginTop: 40 }}>
          <div
            style={{
              display: "flex",
              border: `3px solid ${CREAM}`,
              padding: "12px 26px",
              fontSize: 32,
            }}
          >
            vitozap.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: spaceGrotesk, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: jetbrainsMono, weight: 400, style: "normal" },
      ],
    }
  )
}
