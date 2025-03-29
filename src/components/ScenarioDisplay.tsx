import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Play } from "lucide-react";
import AnimatedBot from "./AnimatedBot";

interface ScenarioDisplayProps {
  scenario: {
    title: string;
    context: string;
    prompts: string[];
    vocabulary: { word: string; translation: string }[];
    hints: string[];
  };
  language: string; // Add language prop
}

const ScenarioDisplay = ({ scenario, language }: ScenarioDisplayProps) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Function to handle text-to-speech
  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language; // Use the language prop dynamically
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false); // Stop animation when speech ends
    window.speechSynthesis.speak(utterance);
  };

  // Speak the context when the component loads
  useEffect(() => {
    speakText(scenario.context);
  }, [scenario.context, language]); // Add language as a dependency

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

      <div className="flex items-center space-x-6">
        {/* Animated person on the left */}
        <div className="w-1/3 flex justify-center items-center">
          <AnimatedBot speaking={isSpeaking} /> {/* Show animation while speaking */}
        </div>

        {/* Play button for the current prompt */}
        <div className="w-2/3 flex flex-col items-center space-y-4">
          <Button
            onClick={() => speakText(scenario.prompts[currentPromptIndex])}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
          >
            <Play className="h-5 w-5" />
            <span>Play Prompt</span>
          </Button>

          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={prevPrompt}
              disabled={currentPromptIndex === 0}
              className="text-sm"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={nextPrompt}
              disabled={currentPromptIndex === scenario.prompts.length - 1}
              className="bg-blue-600 hover:bg-blue-700 text-sm text-white"
            >
              Next
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioDisplay;
