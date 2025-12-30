
import React from 'react';
import { StrategyPoint } from '../types';
import UnpluggedChallengeComponent from './UnpluggedChallenge';

interface StrategyViewProps {
  section: StrategyPoint;
}

const StrategyView: React.FC<StrategyViewProps> = ({ section }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 font-serif">
      {/* Hero Image Section */}
      {section.imageUrl && (
        <div className="relative w-full h-80 rounded-[3rem] overflow-hidden shadow-2xl mb-12 group border border-slate-100">
          <img 
            src={section.imageUrl} 
            alt={section.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
          <div className="absolute bottom-10 left-12 right-12">
            <p className="text-white font-black text-2xl leading-tight drop-shadow-xl tracking-tight">
              {section.id === 'user-analysis' ? '「當光亮只剩下屏幕，我們幫孩子找回世界的顏色」' : 
               section.id === 'user-journey' ? '「這不是一場封鎖，而是一次關於自由的重新出發」' :
               section.id === 'mvp-features' ? '「科學工具與人文關懷的完美交匯」' :
               '專業引領 · 守護成長 · 數位平衡'}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-6 mb-8">
        <span className="text-5xl drop-shadow-md">{section.icon}</span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">{section.title}</h2>
      </div>
      
      <div className="grid gap-6">
        {section.content.map((text, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex gap-6 items-start group hover:border-indigo-300 transition-all hover:shadow-lg">
            <div className="mt-1 w-8 h-8 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-black text-sm shrink-0 shadow-sm">
              {idx + 1}
            </div>
            <p className="text-slate-700 leading-relaxed text-lg font-medium">{text}</p>
          </div>
        ))}
      </div>

      {section.id === 'user-journey' && (
        <div className="mt-16 animate-in fade-in zoom-in duration-700 delay-300">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🧩</span>
            <h3 className="text-2xl font-black text-slate-900">核心交互場景展示：不插電挑戰</h3>
          </div>
          <p className="text-base text-slate-500 mb-8 border-l-4 border-indigo-500 pl-4 font-medium italic">家長端與學生端同步顯示的社交激勵模塊，強調共同進步而非單向監管。</p>
          <UnpluggedChallengeComponent />
        </div>
      )}

      {section.id === 'mvp-features' && (
        <div className="mt-16 bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl border border-slate-800">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-black mb-8 border-b border-white/10 pb-4">✨ MVP 學生端介面預覽</h3>
              <div className="bg-white rounded-[2.5rem] p-10 text-slate-800 shadow-2xl ring-8 ring-white/5">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h4 className="font-black text-2xl tracking-tight text-slate-900">早安，小明 👋</h4>
                    <p className="text-sm text-indigo-500 font-black mt-1 uppercase tracking-widest">目前的數位能量：85%</p>
                  </div>
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">🚀</div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-orange-50 border border-orange-200 rounded-3xl">
                    <p className="text-[11px] font-black text-orange-600 mb-2 uppercase tracking-[0.2em]">今日挑戰</p>
                    <p className="text-lg font-black text-slate-800 leading-snug">完成 20 分鐘離線閱讀，領取「智慧碎片」x10</p>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">進行中課程</p>
                    <div className="flex items-center gap-6 p-5 border-2 border-slate-50 rounded-3xl hover:border-indigo-200 transition-all cursor-pointer group">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🎮</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-black text-slate-800 truncate">解碼多巴胺：為何停不下來</p>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden">
                          <div className="bg-indigo-600 w-1/3 h-full rounded-full shadow-[0_0_8px_rgba(79,70,229,0.5)]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-10 py-5 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all text-base shadow-xl shadow-indigo-200 active:scale-95 tracking-widest">
                  開始 AI 心理健康測評
                </button>
              </div>
            </div>
            <div className="hidden md:block w-1/3 space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop" 
                alt="Support"
                className="rounded-[2.5rem] shadow-2xl border-4 border-white/10 hover:scale-105 transition-transform duration-500"
              />
              <p className="text-base text-indigo-300 mt-6 text-center italic font-black">「陪伴是最好的戒斷，<br/>理解是最深的治癒」</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyView;
