
import React, { useState, useRef, useEffect } from 'react';
import { UnpluggedChallenge, ChallengeMember, ChallengeMessage } from '../types';
import { geminiService } from '../services/gemini';

const INITIAL_MEMBERS: ChallengeMember[] = [
  { id: '1', name: '爸爸', role: '家長', status: 'COMPLETED', avatar: '👨‍💼' },
  { id: '2', name: '媽媽', role: '家長', status: 'PENDING', avatar: '👩‍🏫' },
  { id: '3', name: '小明', role: '我', status: 'PENDING', avatar: '👦' },
  { id: '4', name: '妹妹', role: '學生', status: 'COMPLETED', avatar: '👧' },
];

const INITIAL_MESSAGES: ChallengeMessage[] = [
  { id: 'm1', senderId: '1', senderName: '爸爸', senderAvatar: '👨‍💼', text: '我已經在公園門口等大家囉！', timestamp: '10:05' },
  { id: 'm2', senderId: '4', senderName: '妹妹', senderAvatar: '👧', text: '我快到了，正在過馬路！', timestamp: '10:12' },
];

const INTERESTS = ['運動', '閱讀', '繪畫', '烹飪', '大自然', '音樂', '手作'];

const UnpluggedChallengeComponent: React.FC = () => {
  const [members, setMembers] = useState<ChallengeMember[]>(INITIAL_MEMBERS);
  const [messages, setMessages] = useState<ChallengeMessage[]>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['大自然', '運動']);
  const [pastChallenges, setPastChallenges] = useState<string[]>(['森林呼吸挑戰']);
  
  const [challengeData, setChallengeData] = useState({
    title: '週末不插電：森林呼吸挑戰 🌳',
    description: '全家放下手機，在公園散步 60 分鐘',
    reward: '家庭數位幣 +50'
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerateChallenge = async () => {
    setIsGenerating(true);
    try {
      const result = await geminiService.generatePersonalizedChallenge(selectedInterests, pastChallenges);
      setChallengeData({
        title: result.title,
        description: result.description,
        reward: result.reward
      });
      setPastChallenges(prev => [...prev, result.title]);
      // Reset members status for the new challenge demo
      setMembers(INITIAL_MEMBERS.map(m => ({ ...m, status: 'PENDING' as const })));
      setMessages([{
        id: 'system-' + Date.now(),
        senderId: 'system',
        senderName: '系統',
        senderAvatar: '🤖',
        text: `🆕 AI 已根據你的興趣推薦了新挑戰：${result.title}！大家準備好了嗎？`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      console.error("Failed to generate challenge", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCheckIn = () => {
    setIsCheckingIn(true);
    setTimeout(() => {
      setMembers(prev => prev.map(m => m.id === '3' ? { ...m, status: 'COMPLETED' } : m));
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        senderId: '3',
        senderName: '小明',
        senderAvatar: '👦',
        text: `✅ 我也完成挑戰囉！${challengeData.title} 真好玩。`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsCheckingIn(false);
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: ChallengeMessage = {
      id: Date.now().toString(),
      senderId: '3',
      senderName: '小明',
      senderAvatar: '👦',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, msg]);
    setNewMessage('');
  };

  const completedCount = members.filter(m => m.status === 'COMPLETED').length;
  const progressPercent = Math.round((completedCount / members.length) * 100);

  return (
    <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col md:flex-row h-[850px] md:h-[650px]">
      {/* Left Column: Challenge Progress & AI Personalization */}
      <div className="flex-1 flex flex-col border-r border-slate-100">
        <div className={`p-6 text-white transition-colors duration-500 ${isGenerating ? 'bg-slate-700 animate-pulse' : 'bg-indigo-600'}`}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <span className="px-2 py-1 bg-indigo-500 rounded text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                {isGenerating ? 'AI 正在規劃中...' : '進行中挑戰'}
              </span>
              <h3 className="text-xl font-bold leading-tight">{challengeData.title}</h3>
              <p className="text-indigo-100 text-xs mt-1 leading-relaxed">{challengeData.description}</p>
            </div>
            <div className="text-right ml-4">
              <div className="text-2xl font-bold">{progressPercent}%</div>
              <div className="text-[10px] text-indigo-200 uppercase">團隊進度</div>
            </div>
          </div>
          
          <div className="mt-6 w-full bg-indigo-800/50 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-400 h-full transition-all duration-1000 ease-out" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="p-5 flex-1 overflow-y-auto space-y-6">
          {/* AI Interest Settings */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span className="text-sm">🧬</span> AI 推薦偏好
              </h4>
              <button 
                onClick={handleGenerateChallenge}
                disabled={isGenerating || selectedInterests.length === 0}
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 disabled:text-slate-400 transition-colors uppercase tracking-wider"
              >
                {isGenerating ? '推薦中...' : '重新推薦'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all border ${
                    selectedInterests.includes(interest)
                    ? 'bg-indigo-100 border-indigo-200 text-indigo-600'
                    : 'bg-white border-slate-200 text-slate-400 hover:border-indigo-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Members List */}
          <div className="grid grid-cols-2 gap-3">
            {members.map(member => (
              <div 
                key={member.id} 
                className={`p-3 rounded-2xl border transition-all ${
                  member.status === 'COMPLETED' 
                  ? 'bg-emerald-50 border-emerald-100' 
                  : 'bg-slate-50 border-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{member.avatar}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{member.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-dashed border-slate-300">
            <h4 className="font-bold text-slate-800 text-xs mb-3 flex items-center gap-2">
              <span className="text-lg">📸</span> 挑戰驗證
            </h4>
            <button 
              disabled={members.find(m => m.id === '3')?.status === 'COMPLETED' || isCheckingIn || isGenerating}
              onClick={handleCheckIn}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                members.find(m => m.id === '3')?.status === 'COMPLETED'
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
              }`}
            >
              {isCheckingIn ? '上傳中...' : members.find(m => m.id === '3')?.status === 'COMPLETED' ? '驗證完成' : '上傳照片打卡'}
            </button>
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <span className="truncate">🎁 獎勵：{challengeData.reward}</span>
          <span className="text-orange-500 shrink-0">⌛ 剩餘 18 小時</span>
        </div>
      </div>

      {/* Right Column: Coordination Messaging */}
      <div className="w-full md:w-80 flex flex-col bg-slate-50">
        <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <span className="text-indigo-500">💬</span> 挑戰討論區
          </h4>
          <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold">
            {messages.length} 則留言
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 ${msg.senderId === '3' ? 'flex-row-reverse' : msg.senderId === 'system' ? 'justify-center w-full' : 'flex-row'}`}>
              {msg.senderId !== 'system' && (
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-lg shrink-0 border border-slate-100">
                  {msg.senderAvatar}
                </div>
              )}
              <div className={`max-w-[85%] space-y-1 ${msg.senderId === '3' ? 'items-end' : msg.senderId === 'system' ? 'items-center text-center' : 'items-start'}`}>
                {msg.senderId !== 'system' && (
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[10px] font-bold text-slate-400">{msg.senderName}</span>
                    <span className="text-[8px] text-slate-300 font-medium">{msg.timestamp}</span>
                  </div>
                )}
                <div className={`p-3 rounded-2xl text-[11px] shadow-sm leading-normal ${
                  msg.senderId === '3' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : msg.senderId === 'system'
                  ? 'bg-amber-50 text-amber-700 border border-amber-100 italic'
                  : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex gap-2">
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="輸入留言..."
            className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
          />
          <button 
            type="submit"
            className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-indigo-700 active:scale-95 transition-all shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UnpluggedChallengeComponent;
