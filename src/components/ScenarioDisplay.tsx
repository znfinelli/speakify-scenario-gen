
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, ImageIcon } from "lucide-react";
import AnimatedBot from "./AnimatedBot";
import { generateImage } from "@/utils/aiService";
import { toast } from "sonner";

interface ScenarioDisplayProps {
  scenario: {
    title: string;
    context: string;
    prompts: string[];
    vocabulary: { word: string; translation: string }[];
    hints: string[];
  };
  apiKey: string;
  language: string;
}

const ScenarioDisplay = ({ scenario, apiKey, language }: ScenarioDisplayProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Function to handle text-to-speech
  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set the language based on the selected language
    utterance.lang = language || "en-US";
    
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // Generate an image related to the scenario
  const handleGenerateImage = async () => {
    if (!apiKey) {
      toast.error("Please provide an OpenAI API key");
      return;
    }

    setIsGeneratingImage(true);
    try {
      const prompt = `Create an image related to this scenario: ${scenario.title} - ${scenario.context}`;
      const imageData = await generateImage(apiKey, prompt);
      
      if (imageData && imageData.url) {
        setImageUrl(imageData.url);
        toast.success("Image generated successfully");
      } else {
        toast.error("Failed to generate image");
      }
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error("Failed to generate image. Please check your API key and try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Speak the context when the component loads
  useEffect(() => {
    speakText(scenario.context);
  }, [scenario.context]);

  // Function to toggle transcript visibility
  const toggleTranscript = () => {
    setShowTranscript(!showTranscript);
    if (!showTranscript && !transcript) {
      setTranscript("Listening...");
      // In a real implementation, this would connect to a speech recognition API
      setTimeout(() => {
        setTranscript("This is a simulated transcript of your speaking practice.");
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-700">{scenario.title}</h2>
        <p className="text-gray-600 mt-2">{scenario.context}</p>
      </div>

      <div className="flex items-start space-x-6">
        {/* Left column: Image generation */}
        <div className="w-1/3">
          <div className="flex flex-col items-center space-y-4">
            <Button
              onClick={handleGenerateImage}
              disabled={isGeneratingImage || !apiKey}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
            >
              <ImageIcon className="h-5 w-5" />
              <span>{isGeneratingImage ? "Generating..." : "Generate Image"}</span>
            </Button>
            
            {imageUrl && (
              <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                <img src={imageUrl} alt="Generated scenario" className="w-full h-auto" />
              </div>
            )}
            
            {!imageUrl && (
              <div className="mt-4 flex items-center justify-center bg-gray-100 rounded-lg w-full h-40 text-gray-400">
                <ImageIcon className="h-10 w-10" />
              </div>
            )}
          </div>
        </div>

        {/* Right column: Animated bot and transcript */}
        <div className="w-2/3">
          <div className="flex flex-col space-y-4">
            {/* Animated person */}
            <div className="flex justify-center items-center">
              <AnimatedBot speaking={isSpeaking} />
            </div>

            {/* Play button for the prompt */}
            <Button
              onClick={() => speakText(scenario.prompts[0])}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Play Prompt</span>
            </Button>

            {/* Transcript area */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <Button
                  variant="outline"
                  onClick={toggleTranscript}
                  className={showTranscript ? "bg-blue-100" : ""}
                >
                  {showTranscript ? "Hide Transcript" : "Show Transcript"}
                </Button>
              </div>
              
              {showTranscript && (
                <div className="p-3 border rounded-md bg-gray-50 min-h-[100px]">
                  {transcript || "No transcript available yet. Start speaking to generate one."}
                </div>
              )}
            </div>

            {/* Vocabulary and hints buttons */}
            <div className="flex space-x-2 mt-4">
              <Button variant="outline" className="flex-1">
                Show Vocabulary
              </Button>
              <Button variant="outline" className="flex-1">
                Show Hints
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioDisplay;
