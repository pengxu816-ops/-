
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
        {/* 背景光暈 */}
        <defs>
          <radialGradient id="logo-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50%" cy="40%" r="35%" fill="url(#logo-glow)" />

        {/* 雙手托舉路徑 (下方支持) */}
        <g className="text-slate-200">
          {/* 左手 */}
          <path 
            d="M20 75C25 85 45 95 50 95C52 95 55 94 57 93" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            fill="white"
            fillOpacity="0.8"
          />
          <path 
            d="M10 60C12 70 20 80 30 85" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          {/* 右手 */}
          <path 
            d="M80 75C75 85 55 95 50 95C48 95 45 94 43 93" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            fill="white"
            fillOpacity="0.8"
          />
          <path 
            d="M90 60C88 70 80 80 70 85" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </g>

        {/* 黃絲帶 (右環) */}
        <path 
          d="M50 40C65 20 85 30 85 50C85 70 65 85 50 90" 
          stroke="#F59E0B" 
          strokeWidth="10" 
          strokeLinecap="round"
          className="drop-shadow-sm"
        />

        {/* 紅絲帶 (左環) */}
        <path 
          d="M50 40C35 20 15 30 15 50C15 70 35 85 50 90" 
          stroke="#EF4444" 
          strokeWidth="10" 
          strokeLinecap="round"
          className="drop-shadow-sm"
        />

        {/* 交疊處修復 - 強化環繞感 */}
        <path 
          d="M50 40C55 33 60 30 65 30" 
          stroke="#F59E0B" 
          strokeWidth="10" 
          strokeLinecap="round"
        />
        <path 
          d="M50 40C45 33 40 30 35 30" 
          stroke="#EF4444" 
          strokeWidth="10" 
          strokeLinecap="round"
        />

        {/* 中心點的高光與陰影細節 */}
        <circle cx="50%" cy="40%" r="3" fill="#FFF" fillOpacity="0.5" />
      </svg>
      
      {/* 底部微弱的文字支撐感 */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent blur-sm"></div>
    </div>
  );
};

export default Logo;
