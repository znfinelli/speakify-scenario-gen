import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { languages, categories, proficiencyLevels } from "@/data/languageData";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (lang: string) => void;
  level: string;
  setLevel: (level: string) => void;
  category: string;
  setCategory: (category: string) => void;
  customCategory: string;
  setCustomCategory: (category: string) => void;
}

const LanguageSelector = ({
  language,
  setLanguage,
  level,
  setLevel,
  category,
  setCategory,
  customCategory,
  setCustomCategory,
}: LanguageSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="language" className="text-gray-700">
          Target Language
        </Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger id="language" className="w-full">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="level" className="text-gray-700">
          Proficiency Level
        </Label>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger id="level" className="w-full">
            <SelectValue placeholder="Select your level" />
          </SelectTrigger>
          <SelectContent>
            {proficiencyLevels.map((lvl) => (
              <SelectItem key={lvl.value} value={lvl.value}>
                {lvl.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-gray-700">
          Conversation Category
        </Label>
        <Select value={category} onValueChange={(val) => {
          setCategory(val);
          // Reset custom category if not "other"
          if (val !== "other") {
            setCustomCategory("");
          }
        }}>
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
            <SelectItem value="other">Other (Custom)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {category === "other" && (
        <div className="space-y-2">
          <Label htmlFor="customCategory" className="text-gray-700">
            Custom Category
          </Label>
          <Input
            id="customCategory"
            placeholder="Enter a custom conversation topic"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
