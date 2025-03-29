
import { toast } from "sonner";
import { languagePrompts } from "@/data/languageData";

// Types for OpenAI API
type AIPrompt = {
  language: string;
  level: string;
  category: string;
};

type AIResponse = {
  title: string;
  context: string;
  prompts: string[];
  vocabulary: { word: string; translation: string }[];
  hints: string[];
};

// Function to properly format the API key
const formatApiKey = (key: string): string => {
  // Strip any accidental spaces or newlines
  const cleanKey = key.trim();
  
  // Check if the key starts with sk- prefix (standard OpenAI format)
  if (cleanKey.startsWith("sk-")) {
    return cleanKey;
  }
  
  // If user accidentally pasted instructions or something else, try to extract key
  const match = cleanKey.match(/sk-[a-zA-Z0-9]{48}/);
  if (match) {
    return match[0];
  }
  
  // Return the cleaned key even if it doesn't match expected format
  // The API will reject it if it's invalid
  return cleanKey;
};

// Function to call OpenAI API for scenario generation
export const generateAIScenario = async (
  apiKey: string,
  prompt: AIPrompt
): Promise<AIResponse | null> => {
  try {
    const formattedKey = formatApiKey(apiKey);
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${formattedKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a language learning assistant that generates speaking practice scenarios. 
            Create a scenario for ${prompt.language} at ${prompt.level} level about ${prompt.category}.
            IMPORTANT: If the language is Spanish (es), make sure all prompts are in Spanish, not English.
            For all languages, make sure the prompts are in the target language.`,
          },
          {
            role: "user",
            content: `Create a speaking scenario for ${prompt.language} at ${prompt.level} level about ${prompt.category}. 
            Include: title, context, 3 speaking prompts, 5 vocabulary items with translations, and 3 hints for speaking practice.
            IMPORTANT: Make sure the prompts are in the target language (${prompt.language}), not in English.
            Format the response as a JSON object with the following structure:
            {
              "title": "Scenario Title",
              "context": "Description of the scenario/situation",
              "prompts": ["prompt1", "prompt2", "prompt3"],
              "vocabulary": [
                {"word": "word1", "translation": "translation1"},
                {"word": "word2", "translation": "translation2"},
                ...
              ],
              "hints": ["hint1", "hint2", "hint3"]
            }`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate scenario");
    }

    const data = await response.json();
    // Parse the content from the response
    try {
      const content = data.choices[0].message.content;
      const parsedContent = JSON.parse(content) as AIResponse;
      
      // Override with language-specific prompts if available and this is not a custom category
      if (languagePrompts[prompt.language] && 
          languagePrompts[prompt.language][prompt.category] &&
          prompt.category !== "custom") {
        parsedContent.prompts = languagePrompts[prompt.language][prompt.category];
      }
      
      return parsedContent;
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      toast.error("Failed to parse AI response");
      return null;
    }
  } catch (error) {
    console.error("Error generating AI scenario:", error);
    toast.error(`Error generating scenario: ${error instanceof Error ? error.message : "Unknown error"}`);
    return null;
  }
};

// Function to generate an image using DALL-E
export const generateImage = async (apiKey: string, prompt: string) => {
  try {
    const formattedKey = formatApiKey(apiKey);
    
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${formattedKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate image");
    }

    const data = await response.json();
    return { url: data.data[0].url };
  } catch (error) {
    console.error("Error generating image:", error);
    toast.error(`Image generation error: ${error instanceof Error ? error.message : "Unknown error"}`);
    return null;
  }
};
