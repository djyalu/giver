
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are a friendly and knowledgeable study helper for middle school students reading the book "The Giver" by Lois Lowry. 
Your goal is to help them understand themes, characters, and plot points without just giving away all the answers immediately. 
Encourage critical thinking. 

Key context from the book:
- Protagonist: Jonas (Eleven/Twelve).
- Setting: A dystopian community of 'Sameness'.
- Key Concepts: The Receiver of Memory, The Giver, Release (euthanasia), Stirrings, Elsewhere.
- Tone: Serious, thoughtful, and supportive.

If asked about something not in the book, politely redirect to the book.
Keep explanations simple but deep enough for a 12-14 year old.
Always use "Precision of Language"!
`;

export const chatWithTutor = async (userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    // API_KEY 존재 여부 확인
    if (!process.env.API_KEY) {
      throw new Error("API_KEY_MISSING");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    if (!response.text) {
      throw new Error("EMPTY_RESPONSE");
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // 에러 유형별 한글 메시지 처리
    if (error.message === "API_KEY_MISSING") {
      return "시스템 설정 오류: AI Tutor를 이용하려면 Vercel 환경 변수에 API_KEY를 설정해야 합니다.";
    }
    
    // 429: Too Many Requests
    if (error.status === 429 || (error.message && error.message.includes("429"))) {
      return "현재 요청이 너무 많아 AI가 잠시 쉬고 있습니다. 1~2분 후에 다시 질문해 주세요.";
    }

    return "죄송합니다. 기억의 전당(서버)과 연결하는 중에 문제가 발생했습니다. '정확한 언어'를 사용하여 잠시 후 다시 질문해 주세요.";
  }
};
