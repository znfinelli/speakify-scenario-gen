
export const languages = [
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "zh", name: "Mandarin Chinese Simplified" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
];

export const proficiencyLevels = [
  { value: "beginner", label: "Beginner (A1)" },
  { value: "elementary", label: "Elementary (A2)" },
  { value: "intermediate", label: "Intermediate (B1)" },
  { value: "upper-intermediate", label: "Upper Intermediate (B2)" },
  { value: "advanced", label: "Advanced (C1)" },
  { value: "proficient", label: "Proficient (C2)" },
];

export const categories = [
  { value: "daily life", label: "Daily Life" },
  { value: "travel", label: "Travel & Tourism" },
  { value: "business", label: "Business & Work" },
  { value: "food", label: "Food & Dining" },
  { value: "social", label: "Social Interactions" },
  { value: "health", label: "Health & Medical" },
  { value: "shopping", label: "Shopping" },
  { value: "education", label: "Education" },
  { value: "emergencies", label: "Emergencies" },
  { value: "hobbies", label: "Hobbies & Interests" },
];

// Define language-specific prompts to ensure they're in the correct language
export const languagePrompts = {
  // Spanish prompts
  es: {
    dailyLife: [
      "¿A qué hora te despiertas normalmente?",
      "Describe lo que desayunas cada día.",
      "¿Cómo vas al trabajo o a la escuela?"
    ],
    travel: [
      "¿Puedes recomendarme un buen hotel?",
      "¿Dónde está la estación de tren más cercana?",
      "¿Cuánto cuesta un billete de ida y vuelta?"
    ],
    food: [
      "¿Me podría traer el menú, por favor?",
      "¿Cuál es el plato especial del día?",
      "¿Puedo pagar con tarjeta de crédito?"
    ]
  },
  // French prompts
  fr: {
    dailyLife: [
      "À quelle heure vous réveillez-vous habituellement ?",
      "Décrivez ce que vous mangez au petit-déjeuner.",
      "Comment allez-vous au travail ou à l'école ?"
    ],
    travel: [
      "Pouvez-vous me recommander un bon hôtel ?",
      "Où se trouve la gare la plus proche ?",
      "Combien coûte un billet aller-retour ?"
    ],
    food: [
      "Pourriez-vous m'apporter le menu, s'il vous plaît ?",
      "Quel est le plat du jour ?",
      "Puis-je payer par carte de crédit ?"
    ]
  }
  // More languages can be added here following the same pattern
};
