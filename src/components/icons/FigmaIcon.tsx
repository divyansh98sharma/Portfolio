interface FigmaIconProps {
  className?: string;
}

export function FigmaIcon({
  className = "h-4 w-4",
}: FigmaIconProps) {
  return (
    <svg
      viewBox="0 0 256 384"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="20"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Top left circle */}
      <circle cx="64" cy="64" r="64" />
      {/* Middle left circle */}
      <circle cx="64" cy="192" r="64" />
      {/* Bottom left circle */}
      <circle cx="64" cy="320" r="64" />
      {/* Top right circle */}
      <circle cx="192" cy="64" r="64" />
      {/* Middle right circle */}
      <circle cx="192" cy="192" r="64" />
    </svg>
  );
}