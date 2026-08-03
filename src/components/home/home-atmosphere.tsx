import type { CSSProperties } from "react";

const floatingBubbles = [
  {
    id: "bubble-1",
    size: 150,
    left: "3%",
    top: "6%",
    duration: 14,
    delay: 0,
    direction: "right",
  },
  {
    id: "bubble-2",
    size: 74,
    left: "89%",
    top: "10%",
    duration: 11,
    delay: 1.2,
    direction: "left",
  },
  {
    id: "bubble-3",
    size: 210,
    left: "80%",
    top: "27%",
    duration: 17,
    delay: 2,
    direction: "right",
  },
  {
    id: "bubble-4",
    size: 96,
    left: "7%",
    top: "38%",
    duration: 12,
    delay: 0.6,
    direction: "left",
  },
  {
    id: "bubble-5",
    size: 165,
    left: "86%",
    top: "54%",
    duration: 15,
    delay: 1.7,
    direction: "right",
  },
  {
    id: "bubble-6",
    size: 64,
    left: "16%",
    top: "67%",
    duration: 10,
    delay: 2.4,
    direction: "left",
  },
  {
    id: "bubble-7",
    size: 120,
    left: "68%",
    top: "76%",
    duration: 13,
    delay: 0.4,
    direction: "right",
  },
  {
    id: "bubble-8",
    size: 185,
    left: "-3%",
    top: "86%",
    duration: 18,
    delay: 1.1,
    direction: "left",
  },
] as const;

const floatingDust = [
  {
    id: "dust-1",
    left: "14%",
    top: "15%",
    duration: 8,
    delay: 0,
  },
  {
    id: "dust-2",
    left: "30%",
    top: "28%",
    duration: 10,
    delay: 1,
  },
  {
    id: "dust-3",
    left: "72%",
    top: "18%",
    duration: 9,
    delay: 2,
  },
  {
    id: "dust-4",
    left: "82%",
    top: "43%",
    duration: 11,
    delay: 0.5,
  },
  {
    id: "dust-5",
    left: "24%",
    top: "58%",
    duration: 8,
    delay: 1.5,
  },
  {
    id: "dust-6",
    left: "60%",
    top: "70%",
    duration: 10,
    delay: 2.5,
  },
  {
    id: "dust-7",
    left: "40%",
    top: "87%",
    duration: 9,
    delay: 0.8,
  },
] as const;

export default function HomeAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="home-atmosphere pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="home-orbit home-orbit-one" />
      <div className="home-orbit home-orbit-two" />
      <div className="home-orbit home-orbit-three" />

      {floatingBubbles.map((bubble) => {
        const style: CSSProperties = {
          width: bubble.size,
          height: bubble.size,
          left: bubble.left,
          top: bubble.top,
          animationDuration: `${bubble.duration}s`,
          animationDelay: `${bubble.delay}s`,
        };

        return (
          <span
            key={bubble.id}
            className={`home-floating-bubble home-floating-bubble--${bubble.direction} absolute rounded-full`}
            style={style}
          />
        );
      })}

      {floatingDust.map((particle) => {
        const style: CSSProperties = {
          left: particle.left,
          top: particle.top,
          animationDuration: `${particle.duration}s`,
          animationDelay: `${particle.delay}s`,
        };

        return (
          <span
            key={particle.id}
            className="home-floating-dust absolute h-2 w-2 rounded-full"
            style={style}
          />
        );
      })}
    </div>
  );
}