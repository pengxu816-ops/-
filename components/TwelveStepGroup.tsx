
import React, { useState } from 'react';

const TWELVE_STEPS = [
  { id: 1, title: '誠實面對', desc: '承認我們對網絡與數位設備的失控，生活已變得難以應付。', category: '核心認知' },
  { id: 2, title: '建立信念', desc: '相信一種超越個人的支持力量（如小組或專業力量）能幫助恢復平衡。', category: '希望重建' },
  { id: 3, title: '交付意願', desc: '決定將我們的行為管理與數位合約交付給更科學的指導體系。', category: '行為重組' },
  { id: 4, title: '道德盤點', desc: '對我們的數位使用動機、逃避行為與關係疏離進行徹底的審視。', category: '自我分析' },
  { id: 5, title: '坦白真相', desc: '向自己、家人或小組導師坦誠我們數位成癮的具體性質與傷害。', category: '情感修復' },
  { id: 6, title: '準備改變', desc: '在心理上完全準備好讓專業的干預手段移除我們性格中的逃避模式。', category: '意志鍛鍊' },
  { id: 7, title: '謙卑請求', desc: '謙卑地請求移除我們對虛擬獎賞與多巴胺短路路徑的依賴。', category: '神經重塑' },
  { id: 8, title: '列出清單', desc: '列出所有因為我們的數位依賴而受到傷害的人，並願意做出補償。', category: '關係重建' },
  { id: 9, title: '直接補償', desc: '在不傷害他人的前提下，盡可能對那些因我們的疏離而受損的關係進行彌補。', category: '行動落實' },
  { id: 10, title: '持續覺察', desc: '持續進行每日的數位使用盤點，一旦發現失控跡象便立即承認。', category: '長效維持' },
  { id: 11, title: '冥想與連結', desc: '通過正念與冥想增進對現實世界的感官連結，而非虛擬世界的逃避。', category: '精神昇華' },
  { id: 12, title: '傳遞訊息', desc: '在經歷了心理覺醒後，我們試圖將這個訊息傳遞給其他成癮者並實踐。', category: '利他奉獻' }
];

const TwelveStepGroup: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Hero Header */}
      <div className="relative w-full h-80 rounded-[3rem] overflow-hidden shadow-2xl group border border-slate-100">
        <img 
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200" 
          alt="Support Group"
          className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent"></div>
        <div className="absolute inset-y-0 left-0 p-12 flex flex-col justify-center max-w-xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-indigo-600 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-md shadow-lg">臨床康復模組</span>
            <span className="px-4 py-1.5 bg-white/10 text-white/90 text-[11px] font-bold backdrop-blur-md rounded-md border border-white/20 tracking-widest">100% 匿名安全</span>
          </div>
          <h2 className="text-5xl font-black text-white mb-6 leading-tight tracking-tight">12步驟網癮<br/>匿名康復小組</h2>
          <p className="text-slate-300 text-base leading-relaxed font-medium border-l-2 border-indigo-500 pl-4 italic">
            借鑒傳統成癮康復的「12步法」，結合數位時代的神經心理機制，為青少年提供一條從「失控」到「自由」的集體支持路徑。
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left Side: Step List - 結構工整 */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 border-b-2 border-slate-100 pb-4 mb-8">
            <span className="text-indigo-600">👣</span> 康復路徑圖
          </h3>
          <div className="grid gap-4">
            {TWELVE_STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-6 p-6 rounded-[1.5rem] border transition-all duration-300 text-left ${
                  activeStep === step.id 
                  ? 'bg-white border-indigo-500 shadow-xl shadow-indigo-100 ring-2 ring-indigo-500/20 translate-x-2' 
                  : 'bg-slate-50 border-slate-100 hover:border-slate-200 hover:bg-white'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${
                  activeStep === step.id ? 'bg-indigo-600 text-white rotate-3' : 'bg-white text-slate-400'
                }`}>
                  {step.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={`text-lg font-black tracking-tight ${activeStep === step.id ? 'text-indigo-600' : 'text-slate-800'}`}>
                      {step.title}
                    </h4>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-200 px-2 py-1 rounded">
                      {step.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-1">{step.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Step Detail - 內部層次分明 */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl sticky top-12 border border-slate-800">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
                <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em]">當前步驟詳解</h4>
              </div>
              <h3 className="text-3xl font-black mb-6 leading-tight">步驟 {activeStep}:<br/>{TWELVE_STEPS[activeStep-1].title}</h3>
              <p className="text-lg text-indigo-100/80 leading-relaxed font-medium italic border-l-2 border-indigo-500/30 pl-4">
                「{TWELVE_STEPS[activeStep-1].desc}」
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                <h5 className="text-sm font-black mb-4 flex items-center gap-3 text-indigo-300">
                  <span className="text-xl">🧘‍♂️</span> 臨床導讀與行動建議
                </h5>
                <p className="text-[14px] text-slate-400 leading-relaxed mb-6 font-medium">
                  在這個階段，我們不再與欲望「對抗」，而是學會「觀察」它。請嘗試在感到數位焦慮時，停下來深呼吸三次，感受身體的緊繃感。
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 py-3.5 bg-indigo-600 rounded-2xl text-xs font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-900/40">寫入康復日誌</button>
                  <button className="flex-1 py-3.5 bg-white/10 rounded-2xl text-xs font-black hover:bg-white/20 transition-all border border-white/10">領取覺察卡</button>
                </div>
              </div>

              {/* Anonymity Section */}
              <div className="pt-10 border-t border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="text-sm font-black flex items-center gap-3">
                    <span className="text-indigo-400">🛡️</span> 匿名互助會實錄
                  </h5>
                  <span className="text-[10px] text-emerald-400 font-black flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    212 人正在參與
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-2xl border-l-4 border-indigo-500">
                    <p className="text-[11px] text-indigo-300 font-black mb-2 italic">匿名者 A：</p>
                    <p className="text-[13px] text-slate-400 leading-relaxed font-medium">「完成步驟三後，我發現那些離線的清晨才是真實的。」</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border-l-4 border-emerald-500">
                    <p className="text-[11px] text-emerald-300 font-black mb-2 italic">匿名者 C：</p>
                    <p className="text-[13px] text-slate-400 leading-relaxed font-medium">「正在進行步驟八，昨天跟媽媽好好聊了兩個小時，感覺很好。」</p>
                  </div>
                </div>
                <button className="w-full mt-6 py-4 border border-indigo-500/50 rounded-2xl text-xs font-black text-indigo-400 hover:bg-indigo-500/10 transition-all tracking-widest">
                  進入匿名討論區
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwelveStepGroup;
