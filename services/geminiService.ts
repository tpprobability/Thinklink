
import { GoogleGenAI, Part } from "@google/genai";
import { StudyMode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const STUDY_PROMPTS: Record<StudyMode, string> = {
  [StudyMode.SUMMARY]: "Create a high-level executive summary of these notes. Use professional headings (###), bold key terms, and organized bullet points. Focus on logical flow.",
  [StudyMode.KEY_POINTS]: "Extract exactly the top 7-10 most critical concepts from this material. Format each as a numbered list with a bold title and a 1-2 sentence explanation.",
  [StudyMode.FLASHCARDS]: "Generate a set of high-impact flashcards. Format each card clearly like this:\n\n**Front:** [The Question/Concept]\n**Back:** [The Answer/Explanation]\n---\nEnsure there are at least 10 cards if the content permits.",
  [StudyMode.QA]: "Create a deep-dive Q&A session. Ask 5 complex, conceptual questions that test understanding of 'why' and 'how', followed by detailed, comprehensive answers. Use ### for question headers.",
  [StudyMode.QUIZ]: "Design a formal multiple-choice quiz. For each question, provide 4 options (A, B, C, D) and then provide the 'Correct Answer' with a brief explanation of why it is correct. Use Markdown formatting.",
  [StudyMode.SIMPLIFIED]: "Explain the most complex parts of these notes using the 'Feynman Technique'. Use simple analogies, avoid jargon, and speak as if explaining to a curious 10-year-old. Use clear, encouraging language."
};

export interface FilePart {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

export const generateStudyGuide = async (mode: StudyMode, notes: string, fileParts: FilePart[]) => {
  const promptText = STUDY_PROMPTS[mode];
  
  const parts: Part[] = [
    { text: `TASK: ${promptText}\n\nINPUT DATA (Notes & Files):\n${notes || "See attached multimodal data."}` }
  ];

  if (fileParts.length > 0) {
    parts.push(...fileParts);
  }

  const systemInstruction = `
    You are Thinklink, a premium AI academic strategist. 
    Your goal is to transform raw input into cinematic, perfectly formatted study guides.
    ALWAYS use professional Markdown (headers, bolding, lists, blockquotes).
    DO NOT return raw unformatted text blocks.
    Structure your output so it is visually appealing and intellectually rigorous.
    If the user provides an image or PDF, analyze its specific details (text, diagrams, formulas) and integrate them into the response.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts },
      config: {
        systemInstruction,
        temperature: 0.3,
        topP: 0.85,
      },
    });

    if (!response.text) {
      throw new Error("The AI was unable to synthesize this content. Try providing more context.");
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error?.message || "Synthesizer offline. Check your connection.");
  }
};
