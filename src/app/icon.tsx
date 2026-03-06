import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "linear-gradient(135deg, #1a0a0a, #2e1212)",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Gold T&S monogram */}
        <span
          style={{
            fontFamily: "serif",
            fontSize: 16,
            fontWeight: 700,
            background: "linear-gradient(180deg, #d4af37, #c9956b)",
            backgroundClip: "text",
            color: "#d4af37",
            letterSpacing: -1,
          }}
        >
          T&S
        </span>
      </div>
    ),
    { ...size }
  );
}
