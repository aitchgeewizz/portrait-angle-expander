
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ImageFile } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY environment variable is not set");
}

const genAI = new GoogleGenerativeAI(apiKey || '');

interface GenerationOptions {
    imageFile: ImageFile;
    angleDescription: string;
    style: 'studio' | 'lifestyle';
    aspectRatio: string;
    backgroundColorHex?: string; // Optional, only for studio
}

export const generateAngleImage = async ({
  imageFile,
  angleDescription,
  style,
  backgroundColorHex,
  aspectRatio,
}: GenerationOptions): Promise<string> => {
  try {
    if (!apiKey) {
      throw new Error('Google AI API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.');
    }

    // Get the image generation model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image-preview" });
    
    // Build the prompt based on style
    let prompt = '';
    
    if (style === 'studio') {
        if (!backgroundColorHex) {
            throw new Error('Background color is required for studio style.');
        }
        prompt = `From the provided image, extract only the person and place them in a new scene. Re-render the person from this new angle: "${angleDescription}".
    
        **Crucial Instructions:**
        1. **Ignore Borders/Frames:** The source image may have borders, frames, or rounded corners. Completely ignore these. The output must be a clean, full-bleed photograph.
        2. **Person:** Preserve the person's identity, likeness, and key facial features exactly.
        3. **Background:** The entire background must be replaced with a solid, uniform, seamless professional studio backdrop of the exact hex color ${backgroundColorHex}. There must be NO gradients, textures, or color variations. It must be a flat color.
        4. **Lighting:** The lighting on the person should be soft and flattering, consistent with a professional studio portrait, and it must not affect the solid color of the background.
        5. **Aspect Ratio:** The final output image must be a full-bleed photograph with a precise ${aspectRatio} aspect ratio. Do not add any letterboxing, pillarboxing, or borders.`;
    } else { // lifestyle
        prompt = `From the provided image, extract only the person and place them in a new, high-quality, candid lifestyle/editorial photo. The new scene should be: "${angleDescription}".

        **Crucial Instructions:**
        1. **Ignore Borders/Frames:** The source image may have borders, frames, or rounded corners. Completely ignore these. The output must be a clean, full-bleed photograph.
        2. **Person:** Preserve the person's identity, likeness, and key facial features exactly.
        3. **Scene:** Create a realistic and authentic setting as described. Pay attention to natural lighting, depth of field, and composition to achieve a professional editorial look.
        4. **Vibe:** The person should look natural and authentic, not posed like a stock photo. Capture a candid moment.
        5. **Aspect Ratio:** The final output image must be a full-bleed photograph with a precise ${aspectRatio} aspect ratio. Do not add any letterboxing, pillarboxing, or borders.`;
    }

    // Prepare the image part for the API call
    const imagePart = {
      inlineData: {
        data: imageFile.base64,
        mimeType: imageFile.mimeType,
      },
    };

    // Generate the content
    const result = await model.generateContent([prompt, imagePart]);
    
    // Extract the response
    const response = await result.response;
    
    // Check if there are any parts with inline data (images)
    const candidates = response.candidates || [];
    if (candidates.length === 0) {
      throw new Error('No candidates returned from the API');
    }

    const parts = candidates[0].content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    throw new Error('No image was generated for this angle.');
  } catch (error) {
    console.error(`Error generating image for angle "${angleDescription}":`, error);
    throw new Error(`Failed to generate image for: ${angleDescription}.`);
  }
};
