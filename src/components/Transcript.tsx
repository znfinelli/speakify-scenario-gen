
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";

interface TranscriptProps {
  text: string;
  onPlay: () => void;
  apiKey: string;
}

interface WordDefinition {
  word: string;
  definition: string | null;
  loading: boolean;
}

const Transcript: React.FC<TranscriptProps> = ({ text, onPlay, apiKey }) => {
  const [showTranscript, setShowTranscript] = useState(true);
  const [definitions, setDefinitions] = useState<Record<string, WordDefinition>>({});

  const getDefinition = async (word: string) => {
    // Clean the word from punctuation
    const cleanWord = word.replace(/[.,!?;:'"()]/g, '');
    
    // Skip if word is empty after cleaning
    if (!cleanWord) return;
    
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

  // Always render the control even if transcript is hidden
  if (!showTranscript) {
    return (
      <div className="fixed top-4 right-4 z-40 bg-white p-3 rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <Switch
            id="show-transcript"
            checked={showTranscript}
            onCheckedChange={setShowTranscript}
          />
          <Label htmlFor="show-transcript">Show Transcript</Label>
        </div>
      </div>
    );
  }

  // Handle empty text case
  if (!text.trim()) {
    return (
      <Card className="fixed top-4 right-4 z-40 w-80 shadow-lg">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="show-transcript"
                checked={showTranscript}
                onCheckedChange={setShowTranscript}
              />
              <Label htmlFor="show-transcript">Transcript</Label>
            </div>
          </div>
          <div className="text-sm bg-gray-50 p-3 rounded leading-relaxed">
            No transcript available yet. Start a conversation to see it here.
          </div>
        </CardContent>
      </Card>
    );
  }

  // Split text into words for individual hover definitions
  const words = text.split(/\s+/).filter(word => word.trim().length > 0);

  return (
    <Card className="fixed top-4 right-4 z-40 w-80 shadow-lg">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="show-transcript"
              checked={showTranscript}
              onCheckedChange={setShowTranscript}
            />
            <Label htmlFor="show-transcript">Transcript</Label>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 w-8 p-0" 
            onClick={onPlay}
          >
            <Play size={16} />
          </Button>
        </div>
        
        <div className="text-sm bg-gray-50 p-3 rounded leading-relaxed max-h-60 overflow-y-auto">
          {words.map((word, index) => (
            <HoverCard key={index} openDelay={300} closeDelay={100}>
              <HoverCardTrigger asChild>
                <span 
                  className="hover:bg-blue-100 hover:text-blue-700 rounded-sm px-0.5 cursor-help inline-block"
                  onMouseEnter={() => getDefinition(word.replace(/[.,!?;:'"()]/g, ''))}
                >
                  {word}{' '}
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-48 text-xs" align="center">
                {definitions[word.replace(/[.,!?;:'"()]/g, '')]?.loading ? (
                  <Skeleton className="h-4 w-full" />
                ) : (
                  <>
                    <p className="font-semibold mb-1">{word.replace(/[.,!?;:'"()]/g, '')}</p>
                    <p>{definitions[word.replace(/[.,!?;:'"()]/g, '')]?.definition || "Hover to load definition"}</p>
                  </>
                )}
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Transcript;
