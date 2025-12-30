
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/gemini';
import { ChatMessage, NuancedAssessmentResult } from '../types';
import Logo from './Logo';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string, assessment?: NuancedAssessmentResult }[]>([
    { role: 'model', text: '你好！我是 MindfulLink 智能助手。我是由「雙絲帶網癮社工服務」支持的 AI，可以協助你進行動態網癮風險評估。我們可以聊聊你的數位生活習慣嗎？' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = inputValue) => {
    const messageToSend = text.trim();
    if (!messageToSend || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history: ChatMessage[] = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const chat = geminiService.createChat(history);
      const result = await chat.sendMessage({ message: messageToSend });
      
      const functionCalls = result.functionCalls;
      
      if (functionCalls && functionCalls.length > 0) {
        const fc = functionCalls[0];
        if (fc.name === 'submitAssessmentResult') {
          const assessmentData = fc.args as unknown as NuancedAssessmentResult;
          setMessages(prev => [...prev, { 
            role: 'model', 
            text: '評估已完成！我為您生成了一份深度的網癮風險分析畫像：',
            assessment: assessmentData
          }]);
        }
      } else {
        const fullResponse = result.text || '抱歉，我現在無法回答。';
        setMessages(prev => [...prev, { role: 'model', text: fullResponse }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: '抱歉，我現在遇到一點技術問題。請稍後再試，或撥打我們的專業諮詢專線。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { label: '📊 開始動態評估', text: '我想進行深度的網癮狀態評估' },
    { label: '👨‍👩‍👧 家長求助建議', text: '我是家長，想了解如何與孩子進行健康的數位合約溝通' },
    { label: '🌳 離線挑戰推薦', text: '請根據目前的心理狀態推薦一個不插電活動' }
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-slate-900 rounded-full shadow-2xl flex items-center justify-center hover:bg-slate-800 transition-all hover:scale-110 active:scale-95 z-50 group border border-slate-700"
      >
        <Logo className="w-10 h-10 group-hover:rotate-6 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] md:w-[450px] h-[700px] bg-white rounded-[2rem] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-12 duration-300 border border-slate-100">
      {/* Header */}
      <div className="bg-slate-900 p-5 text-white flex justify-between items-center shrink-0 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <div>
            <h4 className="font-bold text-sm tracking-tight">MindfulLink AI 專家</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">臨床級動態評估系統</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 flex items-center justify-center hover:bg-slate-800 rounded-full transition-colors text-slate-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-2`}>
            <div className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
              ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-200' 
              : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
            
            {msg.assessment && (
              <div className="w-full mt-4 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-500">
                <div className={`p-5 text-white flex justify-between items-center ${
                  msg.assessment.level === 'HIGH' ? 'bg-red-600' : 
                  msg.assessment.level === 'MEDIUM' ? 'bg-orange-500' : 'bg-emerald-600'
                }`}>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">網癮風險畫像</p>
                    <h5 className="text-xl font-black">等級：{msg.assessment.level} ({msg.assessment.score}分)</h5>
                  </div>
                  <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
                
                <div className="p-5 space-y-6">
                  <div>
                    <h6 className="text-xs font-bold text-slate-400 uppercase mb-2">深度總結</h6>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{msg.assessment.summary}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h6 className="text-xs font-bold text-slate-400 uppercase mb-2">心理關鍵因素分析</h6>
                    {msg.assessment.factors.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                          f.status === 'CRITICAL' ? 'bg-red-500 animate-pulse' : 
                          f.status === 'WARNING' ? 'bg-orange-400' : 'bg-emerald-400'
                        }`} />
                        <div>
                          <p className="text-[11px] font-bold text-slate-800">{f.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{f.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                    <h6 className="text-xs font-bold text-indigo-700 mb-3 flex items-center gap-2">
                      <span>🛡️</span> 個人化干預建議
                    </h6>
                    <ul className="space-y-2">
                      {msg.assessment.interventionPlan.map((step, idx) => (
                        <li key={idx} className="text-[10px] text-indigo-600 font-medium flex gap-2">
                          <span className="font-bold opacity-40">{idx + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
        {quickActions.map(action => (
          <button
            key={action.label}
            onClick={() => handleSend(action.text)}
            className="whitespace-nowrap px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-extrabold rounded-full transition-all border border-indigo-100 uppercase tracking-wide"
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="p-4 bg-white border-t border-slate-100 flex gap-3 shrink-0 items-center"
      >
        <div className="flex-1 relative">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="回覆專家提問或輸入困擾..."
            className="w-full bg-slate-100/80 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        <button 
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:bg-slate-300 disabled:shadow-none transition-all shrink-0 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AIChatBot;
