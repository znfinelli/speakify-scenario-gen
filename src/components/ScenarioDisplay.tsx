
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ScenarioDisplayProps {
  scenario: {
    title: string;
    context: string;
    prompts: string[];
    vocabulary: { word: string; translation: string }[];
    hints: string[];
  };
}

const ScenarioDisplay = ({ scenario }: ScenarioDisplayProps) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showVocab, setShowVocab] = useState(false);

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
          <div className="mb-4 text-sm text-gray-500">
            Prompt {currentPromptIndex + 1} of {scenario.prompts.length}
          </div>
          <p className="text-xl font-medium">{scenario.prompts[currentPromptIndex]}</p>
          
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
