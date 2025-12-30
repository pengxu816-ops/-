
import React, { useState } from 'react';
import Layout from './components/Layout';
import StrategyView from './components/StrategyView';
import IterationPlan from './components/IterationPlan';
import AIChatBot from './components/AIChatBot';
import { STRATEGY_SECTIONS } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('user-analysis');

  const currentSection = STRATEGY_SECTIONS.find(s => s.id === activeSection);

  return (
    <Layout activeSection={activeSection} onNavigate={setActiveSection}>
      {activeSection === 'prd-plan' ? (
        <IterationPlan />
      ) : currentSection ? (
        <StrategyView section={currentSection} />
      ) : (
        <div className="text-center py-20">
          <p className="text-slate-400">Section not found.</p>
        </div>
      )}
      
      {/* Floating AI ChatBot */}
      <AIChatBot />
      
      {/* Footer Branding */}
      <footer className="mt-24 pt-8 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-sm">
          &copy; 2025 MindfulLink 產品模型方案. 由教育科技與臨床心理健康合規專家團隊設計.
        </p>
      </footer>
    </Layout>
  );
};

export default App;
