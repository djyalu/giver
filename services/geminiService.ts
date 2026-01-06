
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

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to the Hall of Memories right now. Please try again later.";
  }
};
