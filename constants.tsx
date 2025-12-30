
import { StrategyPoint } from './types';

export const STRATEGY_SECTIONS: StrategyPoint[] = [
  {
    id: 'user-analysis',
    title: '1) 用戶細分與核心痛點分析',
    icon: '👥',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    content: [
      '學生（青少年）：主要痛點為學業壓力逃避、社交焦慮（FOMO）、多巴胺失控。渴望自主權與社交認同。',
      '家長：主要痛點為溝通斷層、監控無效導致的焦慮、缺乏數位素養工具。急需科學化、非強制性的干預手段。',
      '教師：主要痛點為校園手機管理困難、學生專注力下降。需要數據化的學生心理健康預警與家校聯繫機制。'
    ]
  },
  {
    id: 'positioning',
    title: '2) 產品定位與價值主張',
    icon: '🎯',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    content: [
      '產品定位：領先的「數位健康（Digital Wellness）」與「心理韌性（Resilience）」培育平台。',
      '價值主張：從「封堵禁止」轉向「正向引導」。通過 AI 干預與替代行為，重建青少年的數位自控力與現實生活連接感。',
      '核心理念：科學實證（CBT/ACT）、法律合規、數據驅動、家校協同。'
    ]
  },
  {
    id: 'mvp-features',
    title: '3) MVP 功能清單',
    icon: '🛠️',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200',
    content: [
      '評估篩查：基於 CIAS-R 修正版的 AI 語音問答式心理測評，動態生成風險畫像。',
      '分級干預：綠燈（預防教育）、黃燈（行為矯正）、紅燈（專家介入/醫療轉介）。',
      '家校協同：建立「數位合約」功能，家長與孩子共同商議時長，而非單向限制。',
      '正向活動：AI 推薦離線替代活動（運動、閱讀、手作），完成可換取「數位代幣」。',
      '時長管理：基於系統底層 API 的柔性提醒與階段性鎖定，配合護眼與睡眠模式。',
      '危機轉介：內嵌 24h 心理熱線與合規診所地圖，具備紅燈預警即時推送機制。'
    ]
  },
  {
    id: 'user-journey',
    title: '4) 首次使用到 30 日用戶旅程',
    icon: '🛣️',
    imageUrl: 'https://images.unsplash.com/photo-1494173853114-8a31a7d72411?auto=format&fit=crop&q=80&w=1200',
    content: [
      'Day 1 (新手村)：完成入學測評，生成個人「數位性格」報告，簽署首份家庭數位合約。',
      'Day 2-7 (習慣建立)：每日完成 1 個微課程 + 1 個線下任務，積累第一波成就感。',
      'Day 8-21 (對抗與重塑)：引入 AI 陪聊解決情緒波動，參與家長/同學間的「不插電挑戰」。',
      'Day 30 (蛻變期)：生成首月數位健康月報，對比風險下降指標，晉級為「數位領航者」。'
    ]
  },
  {
    id: 'content-system',
    title: '5) 內容體系設計',
    icon: '📚',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200',
    content: [
      '微課程：5 分鐘互動式短片，涵蓋「多巴胺真相」、「防網絡欺凌」、「時間管理矩陣」。',
      '微習慣：例如「進門放下手機」、「睡前 1 小時離線」。',
      '任務打卡：結合 RPG 元素，將現實替代行為（如：慢跑 3km）轉化為遊戲經驗值。',
      '反饋機制：雙向打分（孩子打分父母、父母打分孩子），強調關係修復。'
    ]
  },
  {
    id: 'metrics',
    title: '6) 關鍵指標與埋點設計',
    icon: '📊',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    content: [
      '留存指標：DAU/MAU 比例，特別是家長端的長期查看頻率。',
      '依從性指標：數位合約達成率、線下任務打卡真實性（需位置或照片驗證）。',
      '風險指標：CIAS 分數變化趨勢、APP 異常停留時長下降。',
      '埋點：測評完成路徑、干預彈窗點擊率、危機熱線觸發次數。'
    ]
  },
  {
    id: 'growth',
    title: '7) 增長策略',
    icon: '🚀',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    content: [
      'B端滲透：與公立學校合作，作為「心理健康必修課」插件，提供教師端管理後台。',
      'C端社群：建立「不焦慮家長會」主題社群，輸出專業科普圖文，轉化私域流量。',
      '內容運營：與心理學 IP 聯動，推出聯名主題數位排毒挑戰賽。'
    ]
  },
  {
    id: 'compliance',
    title: '8) 風控與合規',
    icon: '⚖️',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200',
    content: [
      '隱私保護：符合 GDPR/PIPL 要求，青少年敏感數據全加密，實施家長監護權驗證。',
      '醫療免責：明確標註本產品為「教育預防工具」而非「醫療診斷」，測評後附帶醫生建議權。',
      '危機干預：偵測到極端負面情緒詞彙時，立即啟動人工核查並聯絡緊急聯繫人。'
    ]
  },
  {
    id: 'architecture',
    title: '9) 技術架構建議',
    icon: '🏗️',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    content: [
      '技術棧：React Native (跨平台) + Node.js 微服務 + Vector DB (儲存心理畫像)。',
      '權限管理：利用 Android MDM / iOS Family Sharing API 實現底層管理且不侵犯隱私。',
      'AI 邊界：Gemini 3 Pro 用於深度評估，Nano 用於端側實時情緒分析（隱私友好）。'
    ]
  }
];
