import React from "react";

interface LogoProps {
  className?: string;
  fill?: string;
}

export function Logo({ className = "w-7 h-7", fill = "currentColor" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Dhimno Logo - Prompt Monolith"
    >
      <title>Dhimno</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 36 36
           C 36 33.8, 37.8 32, 40 32
           H 124
           C 176 32, 220 75, 220 128
           C 220 181, 176 224, 124 224
           H 40
           C 37.8 224, 36 222.2, 36 220
           Z
           M 96 72
           L 152 128
           L 96 184
           H 124
           L 180 128
           L 124 72
           Z"
        fill={fill}
      />
    </svg>
  );
}
