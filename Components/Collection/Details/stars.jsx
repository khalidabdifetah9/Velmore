const PATH = "M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z";

function Row({ fill, size }) {
  return (
    <span className="flex w-max">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={fill}
          className="shrink-0"
          aria-hidden="true"
        >
          <path d={PATH} />
        </svg>
      ))}
    </span>
  );
}

export default function Stars({ rating, size = 16, className = "" }) {
  const pct = (Math.max(0, Math.min(5, rating)) / 5) * 100;

  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className={`relative inline-flex ${className}`}
    >
      <Row fill="#d4d4d0" size={size} />
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pct}%` }}
      >
        <Row fill="#0a0a0a" size={size} />
      </span>
    </span>
  );
}