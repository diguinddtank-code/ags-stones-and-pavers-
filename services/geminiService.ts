import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDesignConcept = async (prompt: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API Key not found");
    }

    // Using Imagen 3 (via gemini-2.5-flash-image wrapper logic or direct imagen model if supported)
    // The prompt guides the model to produce a photorealistic architectural rendering.
    const enhancedPrompt = `Photorealistic architectural rendering of a luxury backyard design in Atlanta, Georgia. 
    The design features: ${prompt}. 
    Style: High-end hardscape, natural stone, professional landscaping photography, golden hour lighting, 4k resolution.`;

    // As per guidelines, using imagen-4.0-generate-001 for high quality image generation
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: enhancedPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64Image = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64Image}`;
    }
    
    throw new Error("No image generated");
  } catch (error) {
    console.error("Error generating design:", error);
    throw error;
  }
};