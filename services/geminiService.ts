
import { GoogleGenAI, Type } from "@google/genai";
import { Analysis, Verdict } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        verdict: {
            type: Type.STRING,
            enum: ["TRUE", "FALSE", "MISLEADING", "NEEDS_CONTEXT"],
            description: "The final verdict on the news article."
        },
        explanation: {
            type: Type.STRING,
            description: "A detailed, point-by-point explanation for the verdict."
        }
    },
    required: ["verdict", "explanation"]
};


export const analyzeNews = async (newsText: string, languageName: string): Promise<Analysis> => {
    try {
        const prompt = `
            You are an expert fact-checker specializing in Indian news. Your task is to analyze the following news article and determine its veracity.

            **Instructions:**
            1. Carefully read the news article provided below.
            2. Determine if the information presented is likely true, false, misleading, or lacks sufficient context.
            3. Provide a clear, one-word verdict from this list: "TRUE", "FALSE", "MISLEADING", or "NEEDS_CONTEXT".
            4. Provide a detailed, point-by-point explanation for your verdict in a neutral, objective tone. Back up your claims with reasoning.
            5. Your entire analysis, including the verdict and explanation, MUST be in the ${languageName} language.
            6. Format your response strictly as the JSON object defined by the provided schema.

            **News Article to Analyze:**
            """
            ${newsText}
            """
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.2,
            }
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);

        // Normalize verdict to one of the enum values
        const verdictKey = (result.verdict || '').toUpperCase() as keyof typeof Verdict;
        const finalVerdict = Object.values(Verdict).includes(verdictKey as Verdict) ? verdictKey as Verdict : Verdict.UNKNOWN;

        return {
            verdict: finalVerdict,
            explanation: result.explanation
        };

    } catch (error) {
        console.error("Error analyzing news:", error);
        throw new Error("Failed to analyze the news. The AI model might be unavailable or the content could not be processed.");
    }
};
