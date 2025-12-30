
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
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" 
      />
      <button 
        onClick={toggleMusic}
        title={isPlaying ? "暫停音樂" : "播放舒緩音樂"}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
          isPlaying ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-700 text-slate-300 hover:text-white'
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
        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
          <span className="animate-bounce">🎵</span> 悅動心情
        </span>
        <span className="text-[9px] text-slate-300 truncate w-32 font-medium">輕快舒緩 · 專注當下</span>
      </div>
      {isPlaying && (
        <div className="flex gap-0.5 h-3 items-end ml-auto">
          <div className="w-0.5 bg-emerald-400 animate-[music-bar_0.8s_ease-in-out_infinite]"></div>
          <div className="w-0.5 bg-emerald-400 animate-[music-bar_1.2s_ease-in-out_infinite] delay-100"></div>
          <div className="w-0.5 bg-emerald-400 animate-[music-bar_0.6s_ease-in-out_infinite] delay-200"></div>
          <div className="w-0.5 bg-emerald-400 animate-[music-bar_1s_ease-in-out_infinite] delay-300"></div>
        </div>
      )}
      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 3px; }
          50% { height: 11px; }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
