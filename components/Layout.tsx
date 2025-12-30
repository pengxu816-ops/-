
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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-80 bg-slate-900 text-white p-6 sticky top-0 h-auto md:h-screen overflow-y-auto z-40">
        <div className="mb-10 flex items-center gap-4">
          <Logo className="w-14 h-14 shrink-0" />
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">MindfulLink</h1>
            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">雙絲帶網癮社工服務</p>
          </div>
        </div>
        
        <div className="space-y-1">
          {[
            { id: 'user-analysis', label: '👥 用戶痛點分析' },
            { id: 'positioning', label: '🎯 產品價值主張' },
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
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium flex items-center gap-3 ${
                activeSection === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <MusicPlayer />

        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-400">❤</span>
              <span className="text-amber-400">❤</span>
              <p className="text-xs text-indigo-300 font-bold uppercase">專業合規聲明</p>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              本方案由「雙絲帶網癮社工服務」體系提供專業支持，符合《未成年人網絡保護條例》，旨在提供教育性預防。
            </p>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-50 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
