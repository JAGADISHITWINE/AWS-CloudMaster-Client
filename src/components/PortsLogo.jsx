import React from 'react';

/**
 * Custom High-Tech Network Ports & Protocols Brand Logo
 * Features:
 * - Glowing multi-tier cyber-optic badge
 * - Dual RJ-45 / Fiber Optic Jack geometry with golden terminal pins
 * - Interconnected network node routes
 * - Active blinking link LEDs (Link 10G & Activity)
 * - Supported sizes: 'sm' (28px), 'md' (40px), 'lg' (56px), 'xl' (76px)
 */
export default function PortsLogo({
  size = 'md',
  className = '',
  animated = true,
  glow = true
}) {
  const sizeMap = {
    xs: { box: 'w-6 h-6', icon: 14, text: 'text-[9px]', led: 'w-1 h-1' },
    sm: { box: 'w-8 h-8', icon: 18, text: 'text-[10px]', led: 'w-1.5 h-1.5' },
    md: { box: 'w-11 h-11', icon: 24, text: 'text-xs', led: 'w-2 h-2' },
    lg: { box: 'w-16 h-16', icon: 34, text: 'text-sm', led: 'w-2.5 h-2.5' },
    xl: { box: 'w-24 h-24', icon: 50, text: 'text-base', led: 'w-3 h-3' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 group ${className}`}>
      {/* Ambient Neon Backlight Glow */}
      {glow && (
        <div
          className={`absolute -inset-1 bg-gradient-to-tr from-cyan-500 via-indigo-600 to-amber-500 rounded-2xl blur-lg transition duration-500 ${
            animated ? 'opacity-70 group-hover:opacity-100 group-hover:scale-110' : 'opacity-60'
          }`}
        />
      )}

      {/* Main Glassmorphic Hardware Badge */}
      <div
        className={`relative ${currentSize.box} rounded-2xl bg-gradient-to-b from-[#0f172a] via-[#090d16] to-[#040711] border border-cyan-400/40 flex items-center justify-center shadow-2xl overflow-hidden transition-transform duration-300 ${
          animated ? 'group-hover:scale-105' : ''
        }`}
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:6px_6px] opacity-15 pointer-events-none" />

        {/* Vector SVG Port Logo */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
        >
          {/* Dual Port Switch Plate Outline */}
          <rect
            x="4"
            y="6"
            width="40"
            height="36"
            rx="6"
            fill="#090d18"
            stroke="url(#portBorderGrad)"
            strokeWidth="1.8"
          />

          {/* Upper Left Status LEDs */}
          <circle cx="9" cy="11" r="1.8" fill="#10b981" className={animated ? 'animate-pulse' : ''} />
          <circle cx="15" cy="11" r="1.8" fill="#f59e0b" />

          {/* Left Port (RJ45 Port 1) */}
          <path
            d="M9 18H21V28H19V32H11V28H9V18Z"
            fill="#030712"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Port 1 Golden Contact Pins */}
          <line x1="12" y1="20" x2="12" y2="23" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
          <line x1="14" y1="20" x2="14" y2="23" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
          <line x1="16" y1="20" x2="16" y2="23" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
          <line x1="18" y1="20" x2="18" y2="23" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />

          {/* Right Port (RJ45 Port 2) */}
          <path
            d="M27 18H39V28H37V32H29V28H27V18Z"
            fill="#030712"
            stroke="#818cf8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Port 2 Golden Contact Pins */}
          <line x1="30" y1="20" x2="30" y2="23" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
          <line x1="32" y1="20" x2="32" y2="23" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
          <line x1="34" y1="20" x2="34" y2="23" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
          <line x1="36" y1="20" x2="36" y2="23" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />

          {/* Connected Bridge Bus Line & Center Packet */}
          <path
            d="M15 36V39H33V36"
            stroke="url(#busGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="39" r="2.2" fill="#38bdf8" className={animated ? 'animate-ping' : ''} />
          <circle cx="24" cy="39" r="1.5" fill="#ffffff" />

          {/* Center Protocol Shield Lock Symbol */}
          <path
            d="M24 13L29 15.5V20.5C29 23.5 24 26 24 26C24 26 19 23.5 19 20.5V15.5L24 13Z"
            fill="url(#shieldGrad)"
            stroke="#38bdf8"
            strokeWidth="1"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="portBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="busGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>

            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4338ca" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
