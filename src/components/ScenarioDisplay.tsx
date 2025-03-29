import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ScenarioDisplayProps {
  scenario: {
    title: string;
    context: string;
    prompts: string[]; // Prompts will still exist in the data but won't be displayed directly
    vocabulary: { word: string; translation: string }[];
    hints: string[];
  };
}

const ScenarioDisplay = ({ scenario }: ScenarioDisplayProps) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const [transcription, setTranscription] = useState<string>(""); // For OpenAI Whisper transcription

  // Placeholder function to handle audio transcription
  const handleAudioTranscription = async (audioBlob: Blob) => {
    try {
      // Replace this with actual OpenAI Whisper API integration
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: audioBlob,
      });
      const data = await response.json();
      setTranscription(data.transcription || ""); // Update transcription state
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  };

  // Simulate audio transcription updates (replace with actual audio recorder integration)
  useEffect(() => {
    // Example: Simulate transcription updates every 5 seconds
    const interval = setInterval(() => {
      setTranscription((prev) => prev + " ...new transcription...");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextPrompt = () => {
    if (currentPromptIndex < scenario.prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    }
  };

  const prevPrompt = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(currentPromptIndex - 1);
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
          {/* Placeholder for an image to emulate a conversation */}
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">[Conversation Image Placeholder]</p>
          </div>

          {/* Display transcription below the image */}
          <div className="mt-4 text-gray-700">
            <h3 className="font-semibold">Transcription:</h3>
            <p className="text-sm">{transcription || "Waiting for transcription..."}</p>
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevPrompt}
              disabled={currentPromptIndex === 0}
              className="text-sm"
            >
              Previous
            </Button>
            <Button
              onClick={nextPrompt}
              disabled={currentPromptIndex === scenario.prompts.length - 1}
              className="bg-blue-600 hover:bg-blue-700 text-sm"
            >
              Next <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
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
