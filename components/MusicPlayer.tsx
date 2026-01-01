
import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(480); // 8 分鐘 = 480 秒
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        audioRef.current.play().catch(err => console.log("Audio play failed: ", err));
        timerRef.current = window.setInterval(() => {
          setTimeLeft(prev => (prev > 0 ? prev - 1 : 480));
        }, 1000);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 p-4 bg-slate-800/40 rounded-2xl border border-white/10 backdrop-blur-xl mt-4 transition-all hover:bg-slate-800/60 shadow-2xl">
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" 
      />
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMusic}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg shadow-indigo-900/40 ${
            isPlaying ? 'bg-indigo-500 text-white shadow-indigo-500/50' : 'bg-slate-700 text-slate-300 hover:text-white'
          }`}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-end mb-1">
            <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] flex items-center gap-1.5">
              <span className={isPlaying ? "animate-spin-slow" : ""}>🌀</span> 
              {isPlaying ? "深度冥想進行中" : "靜心模式已就緒"}
            </span>
            <span className="text-[11px] font-mono text-slate-400 font-bold">{formatTime(timeLeft)} / 8:00</span>
          </div>
          <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-1000 ease-linear"
              style={{ width: `${(1 - timeLeft / 480) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 專業參數標籤 */}
      <div className="grid grid-cols-2 gap-2">
        <div className="px-3 py-1.5 bg-white/5 rounded-lg flex flex-col border border-white/5">
          <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">BPM / 節拍</span>
          <span className="text-[10px] text-indigo-200 font-bold">60 (生理靜息)</span>
        </div>
        <div className="px-3 py-1.5 bg-white/5 rounded-lg flex flex-col border border-white/5">
          <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">MODE / 律動</span>
          <span className="text-[10px] text-indigo-200 font-bold">D-Major (陽光)</span>
        </div>
      </div>

      {/* 呼吸動效酒吧 */}
      {isPlaying && (
        <div className="flex justify-center gap-1.5 h-6 items-center">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="w-1 bg-indigo-400 rounded-full"
              style={{
                animation: `meditation-breath 4s ease-in-out infinite ${i * 0.2}s`
              }}
            ></div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes meditation-breath {
          0%, 100% { height: 4px; opacity: 0.2; }
          50% { height: 20px; opacity: 0.8; }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
