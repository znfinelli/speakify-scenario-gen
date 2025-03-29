// Only updating the Spanish prompts in the existing file
// ... keep existing code until the daily life beginner scenario

// Mock data for scenarios based on language, level, and category
const scenarioTemplates = {
  // Daily Life scenarios
  "daily life": {
    beginner: {
      title: "Morning Routine",
      context: "You're discussing your morning routine with a friend.",
      prompts: [
        "Describe what time you wake up and what you do first.",
        "Talk about what you eat for breakfast.",
        "Explain how you get to work or school.",
      ],
      vocabulary: [
        { word: "despertarse", translation: "to wake up" },
        { word: "ducharse", translation: "to take a shower" },
        { word: "desayuno", translation: "breakfast" },
        { word: "café", translation: "coffee" },
        { word: "ir a", translation: "to go to" },
      ],
      hints: [
        "Use present tense to describe daily routines.",
        "Include time expressions like 'at 7 AM' or 'in the morning'.",
        "Try to use at least 3 vocabulary words in your response.",
      ],
    },
    // ... keep existing code for other levels
  },
  // ... keep existing code for other categories
};

type ScenarioType = {
  title: string;
  context: string;
  prompts: string[];
  vocabulary: { word: string; translation: string }[];
  hints: string[];
};

// Helper function to get a template based on category and level
const getTemplate = (category: string, level: string): ScenarioType => {
  // Default to daily life if category not found
  const categoryTemplates = scenarioTemplates[category as keyof typeof scenarioTemplates] || 
                           scenarioTemplates["daily life"];
  
  // Default to beginner if level not found
  const levelTemplate = categoryTemplates[level as keyof typeof categoryTemplates] || 
                       categoryTemplates["beginner"];
  
  return levelTemplate;
};

// Language-specific prompts
const languagePrompts = {
  "es": {
    "daily life": {
      beginner: {
        prompts: [
          "Describe a qué hora te despiertas y qué haces primero.",
          "Habla sobre lo que comes para el desayuno.",
          "Explica cómo vas al trabajo o a la escuela.",
        ]
      },
      intermediate: {
        prompts: [
          "Describe lo que planeas hacer este fin de semana.",
          "Pregunta a tu colega sobre sus planes para el fin de semana.",
          "Sugiere una actividad que podrían hacer juntos.",
        ]
      },
      advanced: {
        prompts: [
          "Explica cómo gestionas tu equilibrio entre trabajo y vida personal.",
          "Discute los desafíos de mantener un equilibrio saludable en el mundo actual.",
          "Sugiere algunas estrategias que podrían ayudar a mejorar el equilibrio entre trabajo y vida.",
        ]
      }
    },
    "travel": {
      beginner: {
        prompts: [
          "Saluda al recepcionista y explica que tienes una reserva.",
          "Pregunta sobre la hora de salida y el horario del desayuno.",
          "Consulta sobre el acceso a Wi-Fi en el hotel.",
        ]
      },
      intermediate: {
        prompts: [
          "Explica a un transeúnte que estás perdido y buscando una atracción específica.",
          "Pide indicaciones para el transporte público más cercano.",
          "Agradéceles y confirma las indicaciones para asegurarte de que entendiste correctamente.",
        ]
      },
      advanced: {
        prompts: [
          "Defiende tu destino preferido y explica por qué sería una buena elección.",
          "Discute consideraciones de presupuesto y posibles compromisos.",
          "Negocia la duración del viaje y propón un itinerario.",
        ]
      }
    },
    "food": {
      beginner: {
        prompts: [
          "Saluda al camarero y pide un menú.",
          "Pide tu comida y bebidas.",
          "Pregunta sobre los ingredientes de un plato que te interesa.",
        ]
      },
      intermediate: {
        prompts: [
          "Explica una receta de tu cultura a tu amigo.",
          "Haz preguntas sobre cómo preparar un plato tradicional de su cultura.",
          "Discute técnicas de cocina y preferencias de sabor.",
        ]
      },
      advanced: {
        prompts: [
          "Comparte tus opiniones sobre el consumo y producción sostenible de alimentos.",
          "Discute el impacto ambiental de diferentes dietas.",
          "Debate los roles de individuos, empresas y gobiernos en la promoción de la sostenibilidad alimentaria.",
        ]
      }
    }
  },
  "fr": {
    "daily life": {
      beginner: {
        prompts: [
          "Décris à quelle heure tu te réveilles et ce que tu fais en premier.",
          "Parle de ce que tu manges au petit-déjeuner.",
          "Explique comment tu vas au travail ou à l'école.",
        ]
      }
    }
  },
  // Add other languages as needed
};

export const generateScenario = (language: string, level: string, category: string): ScenarioType => {
  // Get base template
  const template = getTemplate(category, level);
  
  // If we have language-specific prompts, replace the template prompts
  if (languagePrompts[language as keyof typeof languagePrompts]) {
    const languageSpecific = languagePrompts[language as keyof typeof languagePrompts];
    
    if (languageSpecific[category as keyof typeof languageSpecific]) {
      const categorySpecific = languageSpecific[category as keyof typeof languageSpecific];
      
      if (categorySpecific[level as keyof typeof categorySpecific]) {
        const levelSpecific = categorySpecific[level as keyof typeof categorySpecific];
        
        // Replace prompts with language-specific ones if available
        if (levelSpecific.prompts) {
          return {
            ...template,
            prompts: levelSpecific.prompts
          };
        }
      }
    }
  }
  
  // If no language-specific prompts found, return the original template
  return template;
};
