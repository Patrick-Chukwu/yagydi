import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { OgMark } from "@/lib/og-mark";

export const alt = "YAGYDI — People with Purpose";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#805D93",
          color: "#FBF9FA",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <OgMark size={88} />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 36,
            lineHeight: 1.2,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
