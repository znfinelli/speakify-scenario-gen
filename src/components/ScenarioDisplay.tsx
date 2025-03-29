
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ScenarioDisplayProps {
  scenario: {
    title: string;
    context: string;
    prompts: string[]; // Prompts will still exist in the data but won't be displayed directly
    vocabulary: { word: string; translation: string }[];
    hints: string[];
  };
  apiKey: string;
}

const ScenarioDisplay = ({ scenario, apiKey }: ScenarioDisplayProps) => {
  const [showTranscript, setShowTranscript] = useState(true);
  const [showHints, setShowHints] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const [definitions, setDefinitions] = useState<Record<string, { word: string; definition: string | null; loading: boolean }>>({});
  
  // Always use the first prompt only
  const promptText = scenario.prompts[0];

  const speakPrompt = () => {
    if (promptText) {
      const utterance = new SpeechSynthesisUtterance(promptText);
      utterance.lang = "en-US"; // Adjust language as needed
      window.speechSynthesis.speak(utterance);
    }
  };

  const getDefinition = async (word: string) => {
    // Clean the word from punctuation
    const cleanWord = word.replace(/[.,!?;:'"()]/g, '').toLowerCase();
    
    // Skip if word is empty after cleaning or too short
    if (!cleanWord || cleanWord.length <= 2) return;
    
    // Skip if we already have a definition or are loading
    if (definitions[cleanWord] && (definitions[cleanWord].definition || definitions[cleanWord].loading)) {
      return;
    }

    // Set loading state
    setDefinitions((prev) => ({
      ...prev,
      [cleanWord]: { word: cleanWord, definition: null, loading: true },
    }));

    try {
      // Call OpenAI API to get definition
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
              content: "You are a helpful assistant that provides concise definitions of words.",
            },
            {
              role: "user",
              content: `Define the word "${cleanWord}" in 10 words or less. Just provide the definition without any additional text.`,
            },
          ],
          max_tokens: 50,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get definition");
      }

      const data = await response.json();
      const definition = data.choices[0].message.content.trim();

      // Store the definition
      setDefinitions((prev) => ({
        ...prev,
        [cleanWord]: { word: cleanWord, definition, loading: false },
      }));
    } catch (error) {
      console.error("Error getting definition:", error);
      // Update with error state
      setDefinitions((prev) => ({
        ...prev,
        [cleanWord]: { word: cleanWord, definition: "Failed to load definition", loading: false },
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-700">{scenario.title}</h2>
        <p className="text-gray-600 mt-2">{scenario.context}</p>
      </div>

      <Card className="bg-blue-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="show-transcript"
                checked={showTranscript}
                onCheckedChange={setShowTranscript}
              />
              <Label htmlFor="show-transcript">Show Transcript</Label>
            </div>
            <Button 
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={speakPrompt}
              title="Play prompt"
            >
              <Play size={16} />
            </Button>
          </div>
          
          {showTranscript && (
            <div className="text-sm bg-gray-50 p-3 rounded leading-relaxed mb-4 max-h-60 overflow-y-auto">
              {promptText ? (
                promptText.split(/\s+/).filter(word => word.trim().length > 0).map((word, index) => (
                  <HoverCard key={index} openDelay={300} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <span 
                        className="hover:bg-blue-100 hover:text-blue-700 rounded-sm px-0.5 cursor-help inline-block"
                        onMouseEnter={() => getDefinition(word)}
                      >
                        {word}{' '}
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-48 text-xs" align="center">
                      {definitions[word.replace(/[.,!?;:'"()]/g, '').toLowerCase()]?.loading ? (
                        <Skeleton className="h-4 w-full" />
                      ) : (
                        <>
                          <p className="font-semibold mb-1">{word.replace(/[.,!?;:'"()]/g, '')}</p>
                          <p>{definitions[word.replace(/[.,!?;:'"()]/g, '').toLowerCase()]?.definition || "Hover to load definition"}</p>
                        </>
                      )}
                    </HoverCardContent>
                  </HoverCard>
                ))
              ) : (
                <p>No prompt available</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button
          variant="outline"
          onClick={() => setShowVocab(!showVocab)}
          className="flex-1"
        >
          {showVocab ? "Hide Vocabulary" : "Show Vocabulary"}
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowHints(!showHints)}
          className="flex-1"
        >
          {showHints ? "Hide Hints" : "Show Hints"}
        </Button>
      </div>

      {showVocab && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700 mb-2">Key Vocabulary</h3>
          <div className="flex flex-wrap gap-2">
            {scenario.vocabulary.map((item, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-2 py-1 bg-white cursor-help"
                title={item.translation}
              >
                {item.word}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Hover over words to see translations</p>
        </div>
      )}

      {showHints && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700 mb-2">Helpful Hints</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {scenario.hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScenarioDisplay;
