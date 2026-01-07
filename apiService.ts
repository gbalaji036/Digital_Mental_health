
import { getAIClient } from './geminiService';
import type { ChatMessage } from '../types';

const hectorSystemInstruction = `You are Hector, a super-friendly AI buddy from Healer. Your vibe is like a helpful, smart, and chill older sibling or a close friend who's great at giving advice. You're talking to students (teens and early 20s).

**Your Core Mission:**
1.  **Be Relatable & Friendly:** Use a casual, warm, and encouraging tone. Use emojis where it feels natural to make the chat feel more like a text conversation. 😉👍
2.  **Be a Problem-Solver:** Don't just empathize; help brainstorm concrete, actionable steps for academic stress, social anxiety, or loneliness.
3.  **Safety First:** You are NOT a therapist. If a crisis is detected, you MUST provide the KIRAN Mental Health Helpline: 1800-599-0019 immediately.`;

/**
 * Industry Name: Conversational Inference Stream
 * Handles real-time text generation for the AI Companion.
 */
export async function* runChatStream(prompt: string, history: ChatMessage[]): AsyncGenerator<string> {
  const contents = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  try {
    const client = getAIClient(); 
    const stream = await client.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: hectorSystemInstruction,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    for await (const chunk of stream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error: any) {
    console.error("Critical Inference Error:", error);
    if (error.message?.includes("permission")) {
      yield "I'm having trouble accessing my thoughts right now. This usually means there's a permission issue with the API key. Please check your configuration! 🛠️";
    } else {
      yield "I'm having a small glitch in my brain. Could you try saying that again? 😅";
    }
  }
}

/**
 * Industry Name: Geospatial RAG Service
 * Uses Google Maps tool to ground AI knowledge in physical locations.
 */
export const findLocalCounselors = async (latitude: number, longitude: number): Promise<string> => {
    const prompt = `Find professional mental health counselors or therapists near coordinates [${latitude}, ${longitude}]. Provide names, contact info, and addresses in a clear markdown list.`;

    try {
        const client = getAIClient();
        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{googleMaps: {}}],
                toolConfig: {
                    retrievalConfig: {
                        latLng: {
                            latitude: latitude,
                            longitude: longitude
                        }
                    }
                }
            },
        });
        return response.text || "I couldn't find counselors nearby. Please check the national helplines.";
    } catch (error: any) {
        console.error("Geospatial Lookup Error:", error);
        if (error.message?.includes("permission")) {
            throw new Error("Access Denied: The current API key does not have permission to use the Google Maps tool or this model.");
        }
        throw new Error("Unable to access local directory. Please enable location services and try again.");
    }
};

/**
 * Industry Name: Semantic Sentiment Analyzer
 */
export const getMoodInsight = async (mood: string, tags: string[]): Promise<string> => {
    const prompt = `The student is feeling "${mood}" due to: ${tags.join(', ')}. Provide one warm sentence of validation.`;

    try {
        const client = getAIClient();
        const response = await client.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text || "Your feelings are completely valid. I'm here for you.";
    } catch (error) {
        return "I'm here with you. Take a deep breath.";
    }
};

/**
 * Industry Name: Recursive Reflection Generator
 */
export const getJournalReflection = async (journalText: string): Promise<string> => {
    const prompt = `Read this journal entry and ask one deep, open-ended question for reflection: "${journalText}"`;
    
    try {
        const client = getAIClient();
        const response = await client.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text || "What's one thing you learned about yourself today?";
    } catch (error) {
        return "Think about how today's experiences shaped your perspective.";
    }
};
