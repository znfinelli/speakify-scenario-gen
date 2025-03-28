
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LanguageSelector from "./LanguageSelector";
import ScenarioDisplay from "./ScenarioDisplay";
import AudioRecorder from "./AudioRecorder";
import { generateScenario } from "@/utils/scenarioUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ScenarioGenerator = () => {
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("beginner");
  const [category, setCategory] = useState("daily life");
  const [scenario, setScenario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");

  const handleGenerateScenario = () => {
    if (!language) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const newScenario = generateScenario(language, level, category);
      setScenario(newScenario);
      setIsLoading(false);
      setActiveTab("practice");
    }, 1000);
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
            />
            
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
                <ScenarioDisplay scenario={scenario} />
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
