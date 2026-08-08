import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — fresh vegetable supplier on Ratu Road, Ranchi`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card. Generated at build time so there is no binary asset to
 * maintain — edit the copy here and it regenerates on the next deploy.
 */
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
          padding: "72px",
          background: "linear-gradient(135deg, #16A34A 0%, #14532D 62%, #0B3B20 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "#4ADE80",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 800,
              color: "#14532D",
            }}
          >
            F
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 800, color: "#FFFFFF" }}>
              {siteConfig.name}
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#4ADE80",
              }}
            >
              Ratu Road · Ranchi · Jharkhand
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -2,
              color: "#FFFFFF",
              maxWidth: 900,
            }}
          >
            Ranchi&apos;s trusted vegetable supplier — farm-fresh, every morning.
          </span>
          <span style={{ fontSize: 30, color: "#ECFDF5", maxWidth: 880 }}>
            Bulk supply for hotels, restaurants &amp; canteens · Doorstep delivery for homes
          </span>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["Daily 5 AM dispatch", "40+ vegetables", "120+ partner farmers"].map(
            (chip) => (
              <span
                key={chip}
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: "#14532D",
                  background: "#ECFDF5",
                  padding: "12px 24px",
                  borderRadius: 999,
                }}
              >
                {chip}
              </span>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
