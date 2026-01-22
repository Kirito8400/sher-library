import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI with environment key
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  /**
   * Generates a new Shayari based on user prompt/mood
   */
  generateShayari: async (mood: string, language: string) => {
    try {
      const model = 'gemini-3-flash-preview';
      const prompt = `Write a deep, meaningful 2-line Shayari (couplet) about "${mood}" in ${language}. 
      Also provide the poet style (e.g., Ghalib-esque, Modern) and a brief translation if not in English.
      Return JSON format.`;
      
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    content: { type: Type.STRING, description: "The shayari text with line breaks" },
                    translation: { type: Type.STRING, description: "English translation" },
                    style: { type: Type.STRING, description: "Style or tone of the poem" }
                }
            }
        }
      });
      
      const text = response.text;
      if (!text) throw new Error("No response from AI");
      return JSON.parse(text);

    } catch (error) {
      console.error("Gemini Generation Error:", error);
      throw error;
    }
  },

  /**
   * Explains the meaning of a given Shayari
   */
  explainShayari: async (shayariContent: string) => {
    try {
        const model = 'gemini-3-flash-preview';
        const prompt = `Explain the meaning and depth of this Shayari in simple English:
        "${shayariContent}"
        Keep it concise (max 3 sentences).`;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        
        return response.text;

    } catch (error) {
        console.error("Gemini Explanation Error:", error);
        throw error;
    }
  }
};
