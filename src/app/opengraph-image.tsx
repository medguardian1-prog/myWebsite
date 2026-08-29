import { ImageResponse } from "next/og";
import { site, contact } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08070b",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(255,122,26,0.34) 0%, rgba(255,61,0,0.10) 45%, rgba(8,7,11,0) 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#b6ff3d" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#8a8598",
              textTransform: "uppercase",
            }}
          >
            Durban · South Africa
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 132,
              letterSpacing: -4,
              color: "#f4efe6",
              lineHeight: 1,
              display: "flex",
            }}
          >
            {site.name}
          </div>
          <div style={{ height: 4, width: 620, background: "linear-gradient(90deg,#ff3d00,#ff7a1a,#ffc24b,#ffe9a8)" }} />
          <div style={{ fontSize: 40, color: "#c9c3d3", display: "flex" }}>
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 30, color: "#ff9e4a", display: "flex" }}>
            R3,300 flat · 21 days free support
          </div>
          <div style={{ fontSize: 26, color: "#8a8598", display: "flex" }}>
            {contact.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
