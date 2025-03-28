
import React from "react";
import ScenarioGenerator from "@/components/ScenarioGenerator";

const Index = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-3">Speakify</h1>
          <p className="text-xl text-gray-600">
            Generate interactive speaking scenarios to practice your language skills
          </p>
        </header>
        
        <main>
          <ScenarioGenerator />
        </main>
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© {currentYear} Speakify - Practice speaking in any language</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
