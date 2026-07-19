"use client";

// Lightweight SVG companion (not full 3D) that echoes the intro robot's
// visual language, positioned above the contact section with both arms
// raised toward the contact card below. Kept as SVG + CSS for performance
// since a second full WebGL canvas here would be unnecessary overhead.

export default function ContactRobot() {
  return (
    <div className="flex justify-center pb-2" aria-hidden="true">
      <svg
        width="140"
        height="150"
        viewBox="0 0 140 150"
        className="animate-float drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]"
      >
        {/* head */}
        <rect x="50" y="10" width="40" height="30" rx="10" fill="#101826" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="58" y="20" width="24" height="8" rx="3" fill="#7DD3FC" opacity="0.9" />

        {/* torso */}
        <rect x="45" y="45" width="50" height="55" rx="14" fill="#0E1826" stroke="#1C2A3D" strokeWidth="1.5" />
        <circle cx="70" cy="70" r="7" fill="#7DD3FC" opacity="0.9" />

        {/* left arm raised */}
        <g className="origin-[50px_50px] animate-[armL_3s_ease-in-out_infinite]">
          <rect x="20" y="35" width="10" height="45" rx="5" fill="#1C2A3D" />
          <circle cx="25" cy="32" r="7" fill="#38BDF8" />
        </g>

        {/* right arm raised */}
        <g className="origin-[90px_50px] animate-[armR_3s_ease-in-out_infinite]">
          <rect x="110" y="35" width="10" height="45" rx="5" fill="#1C2A3D" />
          <circle cx="115" cy="32" r="7" fill="#38BDF8" />
        </g>

        {/* legs */}
        <rect x="52" y="100" width="10" height="30" rx="4" fill="#1C2A3D" />
        <rect x="78" y="100" width="10" height="30" rx="4" fill="#1C2A3D" />

        {/* base glow ring */}
        <ellipse cx="70" cy="134" rx="35" ry="6" fill="#38BDF8" opacity="0.25" />
      </svg>

      <style jsx global>{`
        @keyframes armL {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-18deg);
          }
        }
        @keyframes armR {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(18deg);
          }
        }
      `}</style>
    </div>
  );
}
