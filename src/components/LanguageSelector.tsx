
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languages, categories, proficiencyLevels } from "@/data/languageData";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (lang: string) => void;
  level: string;
  setLevel: (level: string) => void;
  category: string;
  setCategory: (category: string) => void;
}

const LanguageSelector = ({
  language,
  setLanguage,
  level,
  setLevel,
  category,
  setCategory,
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
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LanguageSelector;
