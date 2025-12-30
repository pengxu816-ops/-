
import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Audio play failed: ", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/40 rounded-xl border border-white/10 backdrop-blur-md mt-4 transition-all hover:bg-slate-800/60">
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" 
      />
      <button 
        onClick={toggleMusic}
        title={isPlaying ? "暫停冥想音樂" : "開啟冥想音樂"}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
          isPlaying ? 'bg-indigo-500 text-white animate-pulse' : 'bg-slate-700 text-slate-300 hover:text-white'
        }`}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
          </svg>
        )}
      </button>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest flex items-center gap-1">
          <span className="animate-pulse">🧘‍♂️</span> 冥想靜心
        </span>
        <span className="text-[9px] text-slate-300 truncate w-32 font-medium">空靈放鬆 · 深呼吸</span>
      </div>
      {isPlaying && (
        <div className="flex gap-0.5 h-3 items-end ml-auto">
          <div className="w-0.5 bg-indigo-400 animate-[meditation-bar_2s_ease-in-out_infinite]"></div>
          <div className="w-0.5 bg-indigo-400 animate-[meditation-bar_2.5s_ease-in-out_infinite] delay-200"></div>
          <div className="w-0.5 bg-indigo-400 animate-[meditation-bar_1.8s_ease-in-out_infinite] delay-500"></div>
          <div className="w-0.5 bg-indigo-400 animate-[meditation-bar_2.2s_ease-in-out_infinite] delay-700"></div>
        </div>
      )}
      <style>{`
        @keyframes meditation-bar {
          0%, 100% { height: 2px; opacity: 0.3; }
          50% { height: 10px; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
