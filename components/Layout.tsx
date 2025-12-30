
import React from 'react';
import Logo from './Logo';
import MusicPlayer from './MusicPlayer';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onNavigate: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row font-serif">
      {/* Sidebar Navigation - 外部導航層加粗 */}
      <nav className="w-full md:w-80 bg-slate-900 text-white p-6 sticky top-0 h-auto md:h-screen overflow-y-auto z-40">
        <div className="mb-10 flex items-center gap-4 border-b border-slate-800 pb-8">
          <Logo className="w-14 h-14 shrink-0" />
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">MindfulLink</h1>
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em]">雙絲帶網癮社工服務</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {[
            { id: 'user-analysis', label: '👥 用戶痛點分析' },
            { id: 'positioning', label: '🎯 產品價值主張' },
            { id: 'twelve-steps', label: '👣 匿名康復小組' },
            { id: 'mvp-features', label: '🛠️ MVP 功能清單' },
            { id: 'user-journey', label: '🛣️ 用戶成長旅程' },
            { id: 'content-system', label: '📚 專業內容體系' },
            { id: 'metrics', label: '📊 關鍵指標設計' },
            { id: 'growth', label: '🚀 市場增長策略' },
            { id: 'compliance', label: '⚖️ 風控與合規性' },
            { id: 'architecture', label: '🏗️ 技術架構建議' },
            { id: 'prd-plan', label: '📅 迭代計劃 & PRD' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 text-[15px] font-black flex items-center gap-3 border ${
                activeSection === item.id 
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-xl shadow-indigo-900/40' 
                : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <MusicPlayer />
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="bg-slate-800/30 p-5 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-red-500 text-lg">❤</span>
              <span className="text-amber-500 text-lg">❤</span>
              <p className="text-[11px] text-indigo-300 font-black uppercase tracking-widest">專業合規聲明</p>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium italic">
              本方案由「雙絲帶網癮社工服務」體系提供專業支持，符合《未成年人網絡保護條例》。
            </p>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 bg-white p-6 md:p-16 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
