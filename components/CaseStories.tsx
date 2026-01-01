
import React, { useState } from 'react';

const CaseStories: React.FC = () => {
  const [showScript, setShowScript] = useState(false);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 font-serif pb-24">
      {/* Case Header */}
      <div className="relative w-full h-[450px] rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-100 group">
        <img 
          src="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=1200" 
          alt="Addiction Recovery Story"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
            📖 真實案例紀實
          </div>
          <h2 className="text-5xl font-black text-white leading-tight tracking-tight">十年網癮背後：<br/>那個想被看見的孩子</h2>
          <p className="text-slate-300 text-lg font-medium italic max-w-2xl border-l-4 border-amber-400 pl-6">
            「我不再需要過濾軟體了，因為我有了比軟體更強大的東西——我有了能理解我的人。」
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-6">
            <h3 className="text-2xl font-black text-slate-900">故事背景</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              這是一個關於孤獨、逃避與重生的故事。12 歲開始的網癮，背後疊加了父母離異、頻繁轉學與社交真空。在長達十年的迷失後，他如何透過「十二步互助小組」找回真實的世界？
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">成癮時長</p>
                <p className="text-xl font-black text-indigo-600">10 年+</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">關鍵轉機</p>
                <p className="text-xl font-black text-amber-600">12步匿名小組</p>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-8xl opacity-10 rotate-12 pointer-events-none">🎙️</div>
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black tracking-tight">音頻腳本 (TTS 專用)</h3>
              <button 
                onClick={() => setShowScript(!showScript)}
                className="px-6 py-2 bg-indigo-600 rounded-full text-xs font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-900/40"
              >
                {showScript ? '隱藏腳本' : '展開腳本'}
              </button>
            </div>

            {showScript && (
              <div className="space-y-6 text-indigo-100/90 font-medium leading-relaxed bg-white/5 p-8 rounded-[2rem] border border-white/10 max-h-[600px] overflow-y-auto custom-scrollbar">
                <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-4">--- 開始播放 ---</p>
                
                <p>
                  [背景音樂：溫暖、微弱的鋼琴聲緩緩切入]
                </p>
                
                <p>
                  你知道嗎？在很多網癮故事的背後，其實都藏著一個... 嗯，特別想被看見的孩子。[停頓 1.5s]
                </p>

                <p>
                  有這麼一個男孩，他 12 歲那年，生活突然塌了。父母離婚、不停地搬家、在學校一個朋友都沒有。那種感覺就像... 像是在大海里被連根拔起的一棵草。然後，他發現了那塊發光的螢幕。[語氣轉為低沈] 螢幕多好啊，它永遠在那裡，永遠不會拒絕他。
                </p>

                <p>
                  [輕微嘆息] 這一躲，就是十多年。
                </p>

                <p>
                  他也掙扎過，真的。試過無數次想戒掉——下載那些家長控制軟體、給自己設時間限制，甚至把手機鎖起來。但沒用... 每次到了深夜，他還是會像瘋了一樣繞過那些限制，然後在第二天清晨，被那種巨大的、黏稠的羞恥感給淹沒。他恨自己，覺得自己徹底廢了。
                </p>

                <p>
                  直到有一天... [停頓 1s] 他打通了一個求助熱線。
                </p>

                <p>
                  電話那頭的聲音特別溫柔，沒有評判，也沒有指責。對方只是輕輕問了一句：「你願意跟我說說，到底發生了什麼嗎？」
                </p>

                <p>
                  就這一句。[語氣帶點顫抖] 男孩哭了。他這輩子第一次對別人承認：「我，我需要幫助。」
                </p>

                <p>
                  [音樂稍微變亮一些]
                </p>

                <p>
                  後來，他進了一個叫「十二步互助小組」的地方。當他走進房間，聽到別人講述一模一樣的故事時——那種孤獨，那種想停卻停不下來的絕望——他突然醒了。他意識到：原來，我不是一個壞掉的人，我只是... 只是在用上網來止痛。
                </p>

                <p>
                  [語氣轉為堅定、輕快] 這句話，救了他的命。
                </p>

                <p>
                  他開始辭掉工作，搬回家跟媽媽住。他讓家人保管密碼，只在圖書館上網。但最關鍵的不是這些手段，而是... 他終於敢在小組裡，說出那些藏了十年的羞恥和創傷。他允許自己「被看見」了，而不是被「過濾」。
                </p>

                <p>
                  康復一年後，他在日記裡寫了這麼一段話：
                </p>

                <p>
                  [慢速、充滿感情] 「我現在不再需要任何過濾軟體了。因為，我的心裡已經有了比軟體強大千百倍的東西——那就是，我終於有了，能真正理解我的人。」
                </p>

                <p>
                  [背景音樂漸弱，消失]
                </p>

                <p className="text-amber-400 text-xs font-black uppercase tracking-widest mt-4">--- 腳本結束 ---</p>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 shadow-lg">
            <h4 className="text-xl font-black text-amber-800 mb-4 flex items-center gap-2">
              <span>💡</span> 專家點評
            </h4>
            <div className="space-y-4 text-sm text-amber-700 font-medium leading-relaxed italic">
              <p>「成癮的對立面不是清醒，而是連結。」</p>
              <p>這個案例深刻展示了數位依賴背後的『代償心理』。當現實世界的支持系統（家庭、社交）崩塌時，大腦會自動尋求最容易獲得的多巴胺補償。</p>
              <p>十二步法的核心價值在於『去羞恥化』。只有當成癮者感受到安全與理解，大腦的神經迴路才有可能從防禦模式轉向修復模式。</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
            <h4 className="text-xl font-black text-slate-900">推薦行動</h4>
            <div className="space-y-4">
              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg">了解十二步法</button>
              <button className="w-full py-4 bg-slate-100 text-slate-700 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all">預約專家訪談</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStories;
