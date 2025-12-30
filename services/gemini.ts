
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { ChatMessage } from "../types";

const submitAssessmentResultDeclaration: FunctionDeclaration = {
  name: 'submitAssessmentResult',
  parameters: {
    type: Type.OBJECT,
    description: '提交網癮風險評估的結構化報告。當你收集到足夠資訊（通常 5-8 個問題後）時調用此函數。',
    properties: {
      score: { type: Type.NUMBER, description: '0-100 的綜合風險分數' },
      level: { type: Type.STRING, description: 'LOW, MEDIUM, HIGH' },
      summary: { type: Type.STRING, description: '評估結果的簡短總結' },
      factors: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: '心理因素名稱，如：強迫性、耐受性、戒斷症狀、虛擬社交依賴' },
            status: { type: Type.STRING, description: 'STABLE (綠), WARNING (黃), CRITICAL (紅)' },
            description: { type: Type.STRING, description: '該因素的具體分析' }
          },
          required: ['name', 'status', 'description']
        }
      },
      interventionPlan: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: '建議的具體干預步驟'
      }
    },
    required: ['score', 'level', 'summary', 'factors', 'interventionPlan']
  },
};

export class GeminiService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeAssessment(responses: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `身為臨床心理專家，請分析以下青少年的行為描述並給予 100 字內的正向建議：\n${responses}`,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "0-100 分風險評估" },
            level: { type: Type.STRING, description: "LOW, MEDIUM, HIGH" },
            advice: { type: Type.STRING, description: "正向引導建議" }
          },
          required: ["score", "level", "advice"]
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return { score: 50, level: 'MEDIUM', advice: "保持覺察，與家人多多溝通。" };
    }
  }

  async generatePersonalizedChallenge(interests: string[], pastChallenges: string[]) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `身為青少年心理專家與教育科技產品經理，請根據用戶興趣：${interests.join(', ')}，以及過去參加過的活動：${pastChallenges.join(', ')}，推薦一個適合家庭或小組參與的線下「不插電挑戰（Unplugged Challenge）」。挑戰需具備創意、可執行性，且能增進現實社交連結。`,
      config: {
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "挑戰標題，需包含一個相關 Emoji" },
            description: { type: Type.STRING, description: "挑戰具體內容描述（約 50 字）" },
            reward: { type: Type.STRING, description: "建議的精神或物質獎勵描述" }
          },
          required: ["title", "description", "reward"]
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return { 
        title: "週末桌遊馬拉松 🎲", 
        description: "全家人一起放下手機，進行一場實體桌遊比賽，重拾面對面的歡笑。",
        reward: "贏家可獲得下週免做家事券一次"
      };
    }
  }

  createChat(history: ChatMessage[] = []) {
    const ai = this.getAI();
    return ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: `你是一位資深的青少年心理健康與網癮預防專家。
你的任務是協助用戶進行「智能網癮狀態評估」：
1. 當用戶想要評估時，啟動臨床訪談模式。
2. 進行約 5-8 個問題的動態提問。每次只問一個問題。
3. 根據用戶之前的回答調整後續問題。例如，如果用戶提到遊戲，則深入探討遊戲時間與多巴胺獎勵；如果提到社交焦慮，則探討 FOMO。
4. 提問應溫和、具備同理性且不帶批判。
5. 收集到足夠資訊後，請務必調用 'submitAssessmentResult' 函數提交一份精確且深度的評估報告。
6. 對於家長，請提供情緒支持與科學的溝通建議。
7. 如果發現極端情緒或自傷傾向，提醒聯繫專業醫療機構。`,
        tools: [{ functionDeclarations: [submitAssessmentResultDeclaration] }],
      }
    });
  }
}

export const geminiService = new GeminiService();
