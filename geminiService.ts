
import { GoogleGenAI } from "@google/genai";

/**
 * Factory to create a new GoogleGenAI instance.
 * Guidelines recommend creating a new instance right before API calls 
 * to ensure the most up-to-date API key is used from the selection dialog.
 */
export const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};
