
import { toast } from "sonner";

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

// Function to call OpenAI API
export const generateAIScenario = async (
  apiKey: string,
  prompt: AIPrompt
): Promise<AIResponse | null> => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a language learning assistant that generates speaking practice scenarios. 
            Create a scenario for ${prompt.language} at ${prompt.level} level about ${prompt.category}.`,
          },
          {
            role: "user",
            content: `Create a speaking scenario for ${prompt.language} at ${prompt.level} level about ${prompt.category}. 
            Include: title, context, 3 speaking prompts, 5 vocabulary items with translations, and 3 hints for speaking practice.
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
      return JSON.parse(content) as AIResponse;
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
