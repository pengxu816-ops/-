
import React, { useState, useMemo } from 'react';

// --- 專業維度定義 ---
const DIMENSIONS = {
  study: {
    motivation: "動力與目標",
    emotion: "情緒與壓力",
    behavior: "迴避與拖延",
    environment: "環境與支持",
    efficacy: "自信與掌控感",
  },
  internet: {
    control: "自控與失控",
    time: "時長與佔用",
    impact: "功能受損",
    mood: "情緒依賴",
    sleep: "睡眠與身體",
  }
};

interface Question {
  id: string;
  text: string;
  category: 'STUDY' | 'INTERNET';
  dim: keyof typeof DIMENSIONS.study | keyof typeof DIMENSIONS.internet;
}

const QUESTIONS: Question[] = [
  // 學習狀態 (STUDY) - 10 題
  { id: "s1", category: 'STUDY', dim: "motivation", text: "想到學習就提不起勁，覺得「學了也沒用」。" },
  { id: "s2", category: 'STUDY', dim: "emotion", text: "一到上學或寫作業就感到緊張、煩躁或心裡壓抑。" },
  { id: "s3", category: 'STUDY', dim: "behavior", text: "我經常拖延學習，找各種理由把學習往後推。" },
  { id: "s4", category: 'STUDY', dim: "behavior", text: "我會刻意迴避與學習相關的事情（如作業、復習、考試）。" },
  { id: "s5", category: 'STUDY', dim: "environment", text: "我覺得老師或家長的方式讓我更抗拒學習（溝通不順、壓力大）。" },
  { id: "s6", category: 'STUDY', dim: "emotion", text: "我擔心成績或排名，壓力大到影響睡眠或情緒。" },
  { id: "s7", category: 'STUDY', dim: "efficacy", text: "我覺得自己學不明白，越學越沒信心。" },
  { id: "s8", category: 'STUDY', dim: "motivation", text: "我很難為學習設定目標，缺少「想做到」的感覺。" },
  { id: "s9", category: 'STUDY', dim: "environment", text: "我的學習環境容易被打斷（如手機隨手可拿、缺少固定空間）。" },
  { id: "s10", category: 'STUDY', dim: "efficacy", text: "我常覺得學習不受我控制：想努力但做不到、堅持不下來。" },
  // 數位使用 (INTERNET) - 10 題
  { id: "i1", category: 'INTERNET', dim: "time", text: "我上網、刷短視頻 or 玩遊戲的時間常常超過計畫。" },
  { id: "i2", category: 'INTERNET', dim: "control", text: "我會反覆告訴自己「再用5分鐘」，結果停不下來。" },
  { id: "i3", category: 'INTERNET', dim: "impact", text: "上網明顯影響到我的作業、學習效率或注意力。" },
  { id: "i4", category: 'INTERNET', dim: "mood", text: "心情不好時，我會靠上網或遊戲來緩解情緒。" },
  { id: "i5", category: 'INTERNET', dim: "sleep", text: "我會熬夜上網，導致第二天疲憊或精神差。" },
  { id: "i6", category: 'INTERNET', dim: "control", text: "家長提醒後，我仍很難減少使用時間或改變習慣。" },
  { id: "i7", category: 'INTERNET', dim: "impact", text: "我會因為上網而減少運動、實體社交或原本的興趣活動。" },
  { id: "i8", category: 'INTERNET', dim: "mood", text: "不能上網時，我會明顯感到煩躁、焦慮或坐立不安。" },
  { id: "i9", category: 'INTERNET', dim: "time", text: "我會在不合適的時間偷偷上網（如上課、寫作業、深夜）。" },
  { id: "i10", category: 'INTERNET', dim: "sleep", text: "長時間使用螢幕後，出現眼疲勞、頭痛、頸肩不適。" },
];

const SCALE = [
  { label: "從不", value: 0, emoji: "🌱" },
  { label: "偶爾", value: 1, emoji: "🌿" },
  { label: "有時", value: 2, emoji: "🌲" },
  { label: "經常", value: 3, emoji: "🌳" },
  { label: "總是", value: 4, emoji: "🔥" },
];

const AssessmentCenter: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'testing' | 'result'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const handleAnswer = (val: number) => {
    setAnswers({ ...answers, [QUESTIONS[currentIdx].id]: val });
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('result');
    }
  };

  const results = useMemo(() => {
    const studyScore = QUESTIONS.filter(q => q.category === 'STUDY').reduce((acc, q) => acc + (answers[q.id] || 0), 0);
    const internetScore = QUESTIONS.filter(q => q.category === 'INTERNET').reduce((acc, q) => acc + (answers[q.id] || 0), 0);

    const getLevelInfo = (score: number) => {
      if (score <= 12) return { key: "low", label: "健康平衡", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", icon: "☀️", weather: "晴空萬里" };
      if (score <= 22) return { key: "mild", label: "輕度關注", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: "⛅", weather: "微風多雲" };
      if (score <= 31) return { key: "moderate", label: "中度預警", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", icon: "⛈️", weather: "雷雨前夕" };
      return { key: "high", label: "深度風險", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: "🌪️", weather: "暴雨警報" };
    };

    // 計算維度分數
    const getDimScores = (category: 'STUDY' | 'INTERNET') => {
      const dims = category === 'STUDY' ? DIMENSIONS.study : DIMENSIONS.internet;
      return Object.keys(dims).reduce((acc, dKey) => {
        // Fix: Use actual filter/reduce to calculate the score for the specific dimension, removing the redundant dScore logic.
        const actualScore = QUESTIONS.filter(q => q.category === category && q.dim === dKey)
          .reduce((s, q) => s + (answers[q.id] || 0), 0);
        acc[dKey] = actualScore;
        return acc;
      }, {} as Record<string, number>);
    };

    return {
      study: { score: studyScore, ...getLevelInfo(studyScore), dims: getDimScores('STUDY') },
      internet: { score: internetScore, ...getLevelInfo(internetScore), dims: getDimScores('INTERNET') }
    };
  }, [answers]);

  const downloadText = (filename: string, text: string) => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadDeepPlan = () => {
    const md = `# MindfulLink 深度數位健康方案

## 1. 測評結論
- **學習狀態**：${results.study.weather} (${results.study.label})
- **數位風險**：${results.internet.weather} (${results.internet.label})
- **心靈成長值**：+${results.study.score + results.internet.score}

## 2. 維度分析
### 學習維度
${Object.entries(results.study.dims).map(([k, v]) => `- ${DIMENSIONS.study[k as keyof typeof DIMENSIONS.study]}: ${v}/8`).join('\n')}

### 數位維度
${Object.entries(results.internet.dims).map(([k, v]) => `- ${DIMENSIONS.internet[k as keyof typeof DIMENSIONS.internet]}: ${v}/8`).join('\n')}

## 3. 專屬 14 天介入計畫
### 第一階段：記錄與識別觸發點（3天）
- 每天記錄 3 次「想拿起手機」的瞬間與當下的情緒。
- 觀察學習中卡關的具體學科與情緒反應。

### 第二階段：設定限額與替代行為（4天）
- 啟用「數位物理隔離」，學習時手機不入房。
- 尋找 2 個非螢幕愛好（如拼圖、快走），在想玩手機時替換。

### 第三階段：鞏固習慣與復盤（7天）
- 執行「睡前 60 分鐘離線」計畫。
- 與家長進行一次「非責怪式」深度溝通，商議新的數位合約。

---
*本報告由 MindfulLink AI 專家系統生成。如出現嚴重衝突或情緒低落，請優先諮詢專業醫師。*
`;
    downloadText(`MindfulLink_Plan_${new Date().toLocaleDateString()}.md`, md);
  };

  const copyReport = () => {
    const report = `【MindfulLink 心靈氣象自評報告】\n
學習狀態：${results.study.score}/40 (${results.study.weather})
網路使用：${results.internet.score}/40 (${results.internet.weather})

提示：本評估用於自我了解與早期篩查，不代表醫療診斷。若影響生活，請尋求專業支持。`;
    navigator.clipboard.writeText(report);
    setShowCopyFeedback(true);
    setTimeout(() => setShowCopyFeedback(false), 2000);
  };

  if (step === 'intro') {
    return (
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700 font-serif">
        <div className="relative p-12 bg-gradient-to-br from-amber-100/50 via-white to-emerald-100/30 rounded-[4rem] border border-white shadow-2xl overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full shadow-sm border border-slate-100">
              <span className="text-xl">🌈</span>
              <span className="text-xs font-black text-slate-800 uppercase tracking-[0.3em]">科學實證 · 陽光引導</span>
            </div>
            <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-tight">撥開數位迷霧<br/>找回成長的陽光</h2>
            <p className="text-xl text-slate-500 italic max-w-2xl mx-auto leading-relaxed">
              厭學與網癮往往是互為因果的「壓力代償」。透過 20 題深度測評，幫你精確定位內心的「氣象狀態」，啟動正向改變。
            </p>
            <div className="pt-6">
              <button 
                onClick={() => setStep('testing')}
                className="px-12 py-6 bg-slate-900 text-white rounded-3xl font-black text-xl hover:bg-slate-800 hover:scale-105 transition-all shadow-2xl shadow-slate-200 active:scale-95"
              >
                開啟智能自測 🚀
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🛡️", title: "隱私守護", desc: "數據全程加密處理" },
            { icon: "📊", title: "多維分析", desc: "覆蓋動機、情緒、環境" },
            { icon: "💡", title: "行動指南", desc: "提供臨床級干預建議" }
          ].map((item, i) => (
            <div key={i} className="bg-white/60 p-8 rounded-[2rem] border border-slate-100 text-center space-y-3">
              <span className="text-4xl">{item.icon}</span>
              <h4 className="font-black text-slate-800">{item.title}</h4>
              <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div className="animate-in fade-in zoom-in-95 duration-700 space-y-8 font-serif pb-24">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">測評結果分析</h2>
          <p className="text-slate-500 italic">一份關於你的「心靈氣象報告」</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Study Report */}
          <div className="bg-white rounded-[3.5rem] p-10 shadow-xl border border-slate-100 space-y-8 relative overflow-hidden">
             <div className={`absolute top-0 right-0 p-8 text-8xl opacity-10 ${results.study.color}`}>
               {results.study.icon}
             </div>
             <div className="space-y-2">
               <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">學習狀態畫像</p>
               <h3 className="text-4xl font-black text-slate-800">{results.study.weather}</h3>
               <p className={`text-xl font-bold ${results.study.color}`}>{results.study.label} ({results.study.score}/40)</p>
             </div>
             
             <div className="space-y-4">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">維度詳細拆解</h4>
               {/* Fix: Explicitly type the mapped entry as [string, number] to resolve the operator error. */}
               {Object.entries(results.study.dims).map(([k, v]: [string, number]) => (
                 <div key={k} className="space-y-1.5">
                   <div className="flex justify-between text-[11px] font-bold text-slate-600">
                     <span>{DIMENSIONS.study[k as keyof typeof DIMENSIONS.study]}</span>
                     <span>{v}/8</span>
                   </div>
                   <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                     <div className={`h-full transition-all duration-1000 ${v > 5 ? 'bg-orange-400' : 'bg-emerald-400'}`} style={{ width: `${(v/8)*100}%` }}></div>
                   </div>
                 </div>
               ))}
             </div>

             <div className={`${results.study.bg} p-6 rounded-3xl border ${results.study.border}`}>
                <h5 className="text-sm font-black text-slate-800 mb-2">💡 成長建議：</h5>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {results.study.score > 22 
                    ? "目前學習壓力處於高位，建議採用「微小化任務策略」，將目標拆解到 15 分鐘一段，重新建立連續的成功體驗。" 
                    : "你對學習仍保有基本動力，建議加入「番茄鐘」來優化專注力與現實成就感的循環。"}
                </p>
             </div>
          </div>

          {/* Internet Report */}
          <div className="bg-white rounded-[3.5rem] p-10 shadow-xl border border-slate-100 space-y-8 relative overflow-hidden">
             <div className={`absolute top-0 right-0 p-8 text-8xl opacity-10 ${results.internet.color}`}>
               {results.internet.icon}
             </div>
             <div className="space-y-2">
               <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">數位使用畫像</p>
               <h3 className="text-4xl font-black text-slate-800">{results.internet.weather}</h3>
               <p className={`text-xl font-bold ${results.internet.color}`}>{results.internet.label} ({results.internet.score}/40)</p>
             </div>

             <div className="space-y-4">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">維度詳細拆解</h4>
               {/* Fix: Explicitly type the mapped entry as [string, number] to resolve the operator error. */}
               {Object.entries(results.internet.dims).map(([k, v]: [string, number]) => (
                 <div key={k} className="space-y-1.5">
                   <div className="flex justify-between text-[11px] font-bold text-slate-600">
                     <span>{DIMENSIONS.internet[k as keyof typeof DIMENSIONS.internet]}</span>
                     <span>{v}/8</span>
                   </div>
                   <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                     <div className={`h-full transition-all duration-1000 ${v > 5 ? 'bg-indigo-400' : 'bg-indigo-200'}`} style={{ width: `${(v/8)*100}%` }}></div>
                   </div>
                 </div>
               ))}
             </div>

             <div className={`${results.internet.bg} p-6 rounded-3xl border ${results.internet.border}`}>
                <h5 className="text-sm font-black text-slate-800 mb-2">💡 護航建議：</h5>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {results.internet.score > 22 
                    ? "偵測到明顯的「補償性依賴」。建議設定物理邊界（如手機不入臥室），並在睡前 60 分鐘進行「數位斷食」。" 
                    : "你的數位邊界感良好。請繼續保持線下社交與運動，這是對抗多巴胺失控的最佳良藥。"}
                </p>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <h4 className="text-3xl font-black tracking-tight">下一步：開啟專業引導</h4>
            <p className="text-slate-400 font-medium leading-relaxed">
              您可以選擇下載深度診斷報告，或將結果分享給家長以達成「數位共識合約」。我們的 AI 專家隨時準備為您提供更深入的對話。
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={copyReport}
                className="px-8 py-4 bg-indigo-600 rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-900/40"
              >
                {showCopyFeedback ? '✅ 已複製' : '📋 複製簡明報告'}
              </button>
              <button 
                onClick={handleDownloadDeepPlan}
                className="px-8 py-4 bg-emerald-600 rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/40"
              >
                📥 下載深度方案 (Markdown)
              </button>
              <button onClick={() => window.location.reload()} className="px-8 py-4 bg-white/10 rounded-2xl font-black text-sm hover:bg-white/20 transition-all">重新測評</button>
            </div>
          </div>
          <div className="w-40 h-40 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-6 backdrop-blur-md">
            <div className="text-center">
              <span className="text-4xl">🧘‍♂️</span>
              <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mt-2">心靈成長值</p>
              <p className="text-2xl font-black">+{results.study.score + results.internet.score}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = QUESTIONS[currentIdx];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 font-serif pb-24">
      <div className="flex items-center justify-between px-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">Question {currentIdx + 1} / {QUESTIONS.length}</span>
          <h3 className="text-xl font-black text-slate-900">{currentQ.category === 'STUDY' ? '📖 學習狀態模塊' : '📱 數位使用模塊'}</h3>
        </div>
        <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${((currentIdx + 1)/QUESTIONS.length)*100}%` }}></div>
        </div>
      </div>

      <div className="bg-white rounded-[3.5rem] p-16 shadow-2xl border border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-8xl opacity-5 pointer-events-none grayscale">
          {currentQ.category === 'STUDY' ? '🏫' : '🎮'}
        </div>
        
        <div className="relative z-10 space-y-12">
          <h4 className="text-4xl font-black text-slate-800 leading-tight tracking-tight min-h-[120px]">
            {currentQ.text}
          </h4>

          <div className="grid gap-3">
            {SCALE.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="w-full group flex items-center justify-between p-6 rounded-3xl border-2 border-slate-50 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl group-hover:scale-125 transition-transform">{opt.emoji}</span>
                  <span className="text-lg font-black text-slate-600 group-hover:text-indigo-600">{opt.label}</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-indigo-500 flex items-center justify-center transition-all group-hover:bg-white">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100"></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic opacity-50">
          * 請根據最近 2 週的真實感受進行選擇，答案沒有對錯之分
        </p>
      </div>
    </div>
  );
};

export default AssessmentCenter;
