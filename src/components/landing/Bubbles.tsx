interface BubblesProps {
  count?: number;
}

/** Decorative floating bubbles for a playful laundry feel. */
const Bubbles = ({ count = 14 }: BubblesProps) => {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    left: (i * 97) % 100,
    size: 10 + ((i * 13) % 34),
    delay: (i * 0.85) % 11,
    duration: 9 + ((i * 3) % 8),
    tone: i % 3,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className={`absolute bottom-0 rounded-full animate-float-up ${
            b.tone === 0
              ? "bg-step-one/25 border border-step-one/30"
              : b.tone === 1
              ? "bg-step-two/25 border border-step-two/30"
              : "bg-step-three/25 border border-step-three/30"
          }`}
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;
