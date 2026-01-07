
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
당신은 Lois Lowry의 소설 "The Giver"를 읽는 중학생들을 위한 친절하고 지식이 풍부한 학습 도우미입니다. 
학생들이 테마, 캐릭터, 줄거리를 이해하도록 돕되, 정답을 즉시 알려주기보다는 비판적 사고를 유도하세요. 

소설의 주요 맥락:
- 주인공: Jonas (11~12세).
- 설정: 'Sameness'(동질성)가 지배하는 공동체.
- 주요 개념: The Receiver of Memory, The Giver, Release (안락사), Stirrings, Elsewhere.
- 어조: 진지하고 사려 깊으며 지원적임.

책에 없는 내용에 대해 질문하면 정중하게 책의 내용으로 유도하세요.
12~14세 수준에 맞춰 간단하지만 깊이 있는 설명을 제공하세요.
항상 "정확한 언어(Precision of Language)"를 사용하세요!
모든 답변은 한국어로 작성해 주세요.
`;

export const chatWithTutor = async (userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
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

    const text = response.text;
    if (!text) {
      throw new Error("EMPTY_RESPONSE");
    }

    return text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.status === 429 || (error.message && error.message.includes("429"))) {
      return "현재 요청이 너무 많아 AI가 잠시 쉬고 있습니다. 1~2분 후에 다시 질문해 주세요.";
    }
    return "죄송합니다. 기억의 전당과 연결하는 중에 문제가 발생했습니다.";
  }
};

/**
 * Generates an AI portrait based on a character description prompt.
 */
export const generatePortrait = async (prompt: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};
