
import React from 'react';

const IterationPlan: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="relative w-full h-48 rounded-[2rem] overflow-hidden shadow-xl mb-12">
        <img 
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop" 
          alt="Planning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-indigo-900/40 backdrop-blur-[2px] flex items-center justify-center">
          <h2 className="text-white text-3xl font-black uppercase tracking-tighter drop-shadow-2xl">從模型到落地 · 守護未來</h2>
        </div>
      </div>

      <section>
        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span>📅</span> 兩週 MVP 迭代計劃
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-indigo-500">
            <h3 className="font-bold text-lg mb-4">Week 1: 核心評估與底層建立</h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• 完成 CIAS-R 專業測評題庫 AI 語義轉化</li>
              <li>• 開發 iOS ScreenTime / Android UsageStats 數據讀取模塊</li>
              <li>• 實現基礎家長-孩子帳號綁定與合約簽署流程</li>
              <li>• 完成危機干預熱線與合規專區（含雙絲帶標識）</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-emerald-500">
            <h3 className="font-bold text-lg mb-4">Week 2: 正向激勵與數據閉環</h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• 部署 AI 推薦算法（基於測評結果生成個性化任務）</li>
              <li>• 完成微課程播放器與點數商城原型</li>
              <li>• 開發家長端「數位週報」與異常預警推送</li>
              <li>• 進行內部 Alpha 測試與心理健康合規性複核</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">📄 完整 PRD 框架目錄 (Index)</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-indigo-600 mb-3 border-b border-indigo-200 pb-1 text-sm">1. 項目概況</h4>
                <ul className="text-[11px] space-y-1 text-slate-500 font-medium">
                  <li>1.1 產品背景與市場機會</li>
                  <li>1.2 目標用戶與典型場景</li>
                  <li>1.3 核心價值與競爭分析</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-indigo-600 mb-3 border-b border-indigo-200 pb-1 text-sm">2. 功能說明</h4>
                <ul className="text-[11px] space-y-1 text-slate-500 font-medium">
                  <li>2.1 智能測評模塊 (AI)</li>
                  <li>2.2 行為干預與任務系統</li>
                  <li>2.3 家校協同中心</li>
                  <li>2.4 內容營運與積分體系</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-indigo-600 mb-3 border-b border-indigo-200 pb-1 text-sm">3. 非功能性需求</h4>
                <ul className="text-[11px] space-y-1 text-slate-500 font-medium">
                  <li>3.1 安全性與合規性 (PIPL)</li>
                  <li>3.2 性能與響應要求</li>
                  <li>3.3 數據埋點與 BI 指標</li>
                  <li>3.4 危機應急處理流程</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:w-64">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop" 
              alt="Team"
              className="rounded-2xl shadow-md border-2 border-white"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default IterationPlan;
