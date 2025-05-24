"use client";

import { cn } from "@/lib/utils";

interface SentimintLogoProps {
  size?: number;
  className?: string;
}

export function SentimintLogo({ size = 32, className }: SentimintLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 hover:scale-110"
      >
        <defs>
          <linearGradient id="mintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.769 0.188 70.08)" />
            <stop offset="100%" stopColor="oklch(0.646 0.222 41.116)" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>
        
        {/* Main leaf shape */}
        <path
          d="M16 2C12 2 8 4 6 8C4 12 5 16 8 19C10 21 13 22 16 22C19 22 22 21 24 19C27 16 28 12 26 8C24 4 20 2 16 2Z"
          fill="url(#mintGradient)"
          filter="url(#glow)"
          className="animate-pulse"
          style={{
            animationDuration: "3s",
            animationIterationCount: "infinite",
          }}
        />
        
        {/* Leaf vein/stem */}
        <path
          d="M16 6L16 20"
          stroke="oklch(0.985 0 0)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
        
        {/* Side veins */}
        <path
          d="M13 9L16 12L19 9"
          stroke="oklch(0.985 0 0)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        
        <path
          d="M12 13L16 16L20 13"
          stroke="oklch(0.985 0 0)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        
        {/* Highlight dot */}
        <circle
          cx="18"
          cy="10"
          r="1.5"
          fill="oklch(0.985 0 0)"
          opacity="0.9"
          className="animate-ping"
          style={{
            animationDuration: "2s",
            animationIterationCount: "infinite",
          }}
        />
        
        {/* Base circle for glow effect */}
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="url(#mintGradient)"
          strokeWidth="0.5"
          opacity="0.3"
          className="animate-spin"
          style={{
            animationDuration: "8s",
            animationIterationCount: "infinite",
          }}
        />
      </svg>
      
      <span 
        className="font-bold tracking-tight transition-all duration-300 hover:text-primary"
        style={{ 
          fontSize: size * 0.6,
          background: "linear-gradient(135deg, oklch(0.769 0.188 70.08), oklch(0.646 0.222 41.116))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Sentimint
      </span>
    </div>
  );
}