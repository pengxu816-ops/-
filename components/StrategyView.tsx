
import React from 'react';
import { StrategyPoint } from '../types';
import UnpluggedChallengeComponent from './UnpluggedChallenge';

interface StrategyViewProps {
  section: StrategyPoint;
}

const StrategyView: React.FC<StrategyViewProps> = ({ section }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Image Section */}
      {section.imageUrl && (
        <div className="relative w-full h-72 rounded-[2rem] overflow-hidden shadow-2xl mb-10 group">
          <img 
            src={section.imageUrl} 
            alt={section.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
          <div className="absolute bottom-6 left-8 right-8">
            <p className="text-white font-bold text-lg leading-snug drop-shadow-lg">
              {section.id === 'user-analysis' ? '「當光亮只剩下屏幕，我們幫孩子找回世界的顏色」' : 
               section.id === 'user-journey' ? '「這不是一場封鎖，而是一次關於自由的重新出發」' :
               section.id === 'mvp-features' ? '「科學工具與人文關懷的完美交匯」' :
               '專業引領 · 守護成長 · 數位平衡'}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <span className="text-4xl">{section.icon}</span>
        <h2 className="text-3xl font-bold text-slate-800">{section.title}</h2>
      </div>
      
      <div className="grid gap-4">
        {section.content.map((text, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-start group hover:border-indigo-300 transition-colors">
            <div className="mt-1 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs shrink-0">
              {idx + 1}
            </div>
            <p className="text-slate-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      {section.id === 'user-journey' && (
        <div className="mt-12 animate-in fade-in zoom-in duration-700 delay-300">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span>🧩</span> 核心交互場景展示：不插電挑戰
          </h3>
          <p className="text-sm text-slate-500 mb-6">家長端與學生端同步顯示的社交激勵模塊，強調共同進步而非單向監管。</p>
          <UnpluggedChallengeComponent />
        </div>
      )}

      {section.id === 'mvp-features' && (
        <div className="mt-12 bg-indigo-900 rounded-3xl p-8 text-white">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4">✨ MVP 交互演示 (學生端介面預覽)</h3>
              <div className="bg-white rounded-2xl p-6 text-slate-800 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="font-bold text-lg">早安，小明 👋</h4>
                    <p className="text-xs text-slate-400 font-medium">目前的數位能量：85%</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-xl">🚀</div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                    <p className="text-xs font-bold text-orange-600 mb-1 uppercase tracking-wider">今日挑戰</p>
                    <p className="text-sm font-semibold">完成 20 分鐘離線閱讀，領取「智慧碎片」x10</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase">進行中課程</p>
                    <div className="flex items-center gap-4 p-3 border rounded-xl hover:bg-slate-50 cursor-pointer">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">🎮</div>
                      <div className="flex-1">
                        <p className="text-sm font-bold">解碼多巴胺：遊戲為何停不下來</p>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1">
                          <div className="bg-blue-500 w-1/3 h-full rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors text-sm">
                  開始 AI 心理健康測評
                </button>
              </div>
            </div>
            <div className="hidden md:block w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop" 
                alt="Support"
                className="rounded-3xl shadow-lg border-4 border-white/10"
              />
              <p className="text-[10px] text-indigo-300 mt-4 text-center italic">「陪伴是最好的戒斷，理解是最深的治癒」</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyView;
