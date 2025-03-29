
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import LanguageSelector from "./LanguageSelector";
import ScenarioDisplay from "./ScenarioDisplay";
import AudioRecorder from "./AudioRecorder";
import { generateScenario } from "@/utils/scenarioUtils";
import { generateAIScenario } from "@/utils/aiService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ScenarioGenerator = () => {
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("beginner");
  const [category, setCategory] = useState("daily life");
  const [customCategory, setCustomCategory] = useState("");
  const [scenario, setScenario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");
  const [useAI, setUseAI] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleGenerateScenario = async () => {
    if (!language) {
      toast.error("Please select a language");
      return;
    }
    
    if (category === "custom" && !customCategory) {
      toast.error("Please enter a custom topic");
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (useAI && apiKey) {
        // Use AI to generate scenario
        const effectiveCategory = category === "custom" ? customCategory : category;
        
        const aiScenario = await generateAIScenario(apiKey, {
          language,
          level,
          category: effectiveCategory,
        });
        
        if (aiScenario) {
          setScenario(aiScenario);
          setActiveTab("practice");
        }
      } else {
        // Use predefined templates
        setTimeout(() => {
          const newScenario = generateScenario(language, level, category);
          setScenario(newScenario);
          setActiveTab("practice");
        }, 1000);
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate scenario. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-lg">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="practice" disabled={!scenario}>
            Practice
          </TabsTrigger>
        </TabsList>
        
        <CardContent className="p-6">
          <TabsContent value="generate" className="mt-4">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">
              Create Your Speaking Scenario
            </h2>
            
            <LanguageSelector
              language={language}
              setLanguage={setLanguage}
              level={level}
              setLevel={setLevel}
              category={category}
              setCategory={setCategory}
              customCategory={customCategory}
              setCustomCategory={setCustomCategory}
            />

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="useAI" 
                  checked={useAI}
                  onChange={(e) => setUseAI(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="useAI">Use GPT to generate scenarios</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">OpenAI API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Your API key is used for generating scenarios, word definitions, and images.
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleGenerateScenario}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg"
                disabled={!language || isLoading}
              >
                {isLoading ? "Generating..." : "Generate Scenario"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="practice" className="mt-4">
            {scenario && (
              <div className="space-y-8">
                <ScenarioDisplay 
                  scenario={scenario} 
                  apiKey={apiKey}
                  language={language}
                />
                <AudioRecorder />
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("generate")}
                  >
                    Back to Generator
                  </Button>
                  <Button 
                    onClick={handleGenerateScenario}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Generate New Scenario
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default ScenarioGenerator;
