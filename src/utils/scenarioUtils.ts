
import { languagePrompts } from "@/data/languageData";

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
    intermediate: {
      title: "Weekend Plans",
      context: "You're discussing your plans for the upcoming weekend with a colleague.",
      prompts: [
        "Describe what you're planning to do this weekend.",
        "Ask your colleague about their weekend plans.",
        "Suggest a joint activity you could do together.",
      ],
      vocabulary: [
        { word: "planes", translation: "plans" },
        { word: "fin de semana", translation: "weekend" },
        { word: "quedar", translation: "to meet up" },
        { word: "tiempo libre", translation: "free time" },
        { word: "sugerir", translation: "to suggest" },
      ],
      hints: [
        "Use future tense or 'going to' structure.",
        "Make your suggestions sound natural and not too forceful.",
        "Practice both questions and statements.",
      ],
    },
    advanced: {
      title: "Work-Life Balance",
      context: "You're having a discussion about work-life balance in modern society.",
      prompts: [
        "Explain how you manage your work-life balance.",
        "Discuss the challenges of maintaining a healthy balance in today's world.",
        "Suggest some strategies that might help improve work-life balance.",
      ],
      vocabulary: [
        { word: "equilibrio", translation: "balance" },
        { word: "conciliación", translation: "reconciliation/balancing" },
        { word: "prioridades", translation: "priorities" },
        { word: "agobio", translation: "overwhelm/stress" },
        { word: "desconectar", translation: "to disconnect/switch off" },
      ],
      hints: [
        "Use complex sentence structures with conjunctions.",
        "Express your opinion with phrases like 'I believe that' or 'In my opinion'.",
        "Incorporate some cultural context about work-life balance in the target language's culture.",
      ],
    },
  },
  
  // Travel scenarios
  "travel": {
    beginner: {
      title: "At the Hotel",
      context: "You've just arrived at your hotel and need to check in.",
      prompts: [
        "Greet the receptionist and explain that you have a reservation.",
        "Ask about the check-out time and breakfast hours.",
        "Inquire about Wi-Fi access in the hotel.",
      ],
      vocabulary: [
        { word: "reserva", translation: "reservation" },
        { word: "habitación", translation: "room" },
        { word: "recepción", translation: "reception" },
        { word: "desayuno", translation: "breakfast" },
        { word: "contraseña", translation: "password" },
      ],
      hints: [
        "Start with a polite greeting.",
        "Use simple present tense for your questions.",
        "Practice your numbers when discussing your room number.",
      ],
    },
    intermediate: {
      title: "Lost in the City",
      context: "You're visiting a new city and have gotten lost. You need to ask a local for directions.",
      prompts: [
        "Explain to a passerby that you're lost and looking for a specific attraction.",
        "Ask for directions to the nearest public transportation.",
        "Thank them and confirm the directions to make sure you understood correctly.",
      ],
      vocabulary: [
        { word: "perdido/a", translation: "lost" },
        { word: "dirección", translation: "direction" },
        { word: "mapa", translation: "map" },
        { word: "girar", translation: "to turn" },
        { word: "cerca", translation: "nearby" },
      ],
      hints: [
        "Use the conditional form to be polite when asking for help.",
        "Make sure to include specific questions about distance and turns.",
        "Practice using prepositions of place (next to, in front of, etc.).",
      ],
    },
    advanced: {
      title: "Trip Planning Discussion",
      context: "You're planning an international trip with friends and discussing destinations, budget, and activities.",
      prompts: [
        "Advocate for your preferred destination and explain why it would be a good choice.",
        "Discuss budget considerations and potential compromises.",
        "Negotiate the duration of the trip and propose an itinerary.",
      ],
      vocabulary: [
        { word: "presupuesto", translation: "budget" },
        { word: "alojamiento", translation: "accommodation" },
        { word: "itinerario", translation: "itinerary" },
        { word: "destino", translation: "destination" },
        { word: "imprescindible", translation: "essential/must-see" },
      ],
      hints: [
        "Use persuasive language and comparisons between different options.",
        "Include conditional sentences to discuss hypothetical scenarios.",
        "Practice your negotiation skills with phrases like 'How about if we...' or 'What do you think of...'",
      ],
    },
  },
  
  // Food scenarios
  "food": {
    beginner: {
      title: "Ordering in a Restaurant",
      context: "You're at a restaurant and ready to order your meal.",
      prompts: [
        "Greet the server and ask for a menu.",
        "Order your food and drinks.",
        "Ask about the ingredients in a dish you're interested in.",
      ],
      vocabulary: [
        { word: "menú", translation: "menu" },
        { word: "pedir", translation: "to order" },
        { word: "bebida", translation: "drink" },
        { word: "cuenta", translation: "bill" },
        { word: "ingredientes", translation: "ingredients" },
      ],
      hints: [
        "Begin with a polite greeting.",
        "Use 'I would like' or 'May I have' to order.",
        "Practice food vocabulary specific to the target language's cuisine.",
      ],
    },
    intermediate: {
      title: "Cooking Together",
      context: "You're cooking a meal with a friend from the country of your target language.",
      prompts: [
        "Explain a recipe from your culture to your friend.",
        "Ask questions about how to prepare a traditional dish from their culture.",
        "Discuss cooking techniques and flavor preferences.",
      ],
      vocabulary: [
        { word: "receta", translation: "recipe" },
        { word: "ingredientes", translation: "ingredients" },
        { word: "cocinar", translation: "to cook" },
        { word: "cortar", translation: "to cut" },
        { word: "mezclar", translation: "to mix" },
      ],
      hints: [
        "Use imperatives when explaining steps in the recipe.",
        "Ask specific questions about quantities and cooking times.",
        "Practice vocabulary related to tastes (sweet, salty, spicy, etc.).",
      ],
    },
    advanced: {
      title: "Food Sustainability Debate",
      context: "You're participating in a discussion about sustainable food practices and ethical eating.",
      prompts: [
        "Share your views on sustainable food consumption and production.",
        "Discuss the environmental impact of different diets.",
        "Debate the roles of individuals, businesses, and governments in promoting food sustainability.",
      ],
      vocabulary: [
        { word: "sostenibilidad", translation: "sustainability" },
        { word: "impacto ambiental", translation: "environmental impact" },
        { word: "agricultura ecológica", translation: "organic farming" },
        { word: "huella de carbono", translation: "carbon footprint" },
        { word: "desperdicio alimentario", translation: "food waste" },
      ],
      hints: [
        "Use complex argumentation structures with cause and effect.",
        "Incorporate statistics or hypothetical examples to support your points.",
        "Practice expressing agreement/disagreement with nuance.",
      ],
    },
  },
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

export const generateScenario = (language: string, level: string, category: string): ScenarioType => {
  // Get base template
  const template = getTemplate(category, level);
  
  // Create a copy of the template to avoid modifying the original
  const scenario = { ...template };
  
  // If we have language-specific prompts available, use them
  if (languagePrompts[language] && languagePrompts[language][category]) {
    scenario.prompts = languagePrompts[language][category];
  }
  
  return scenario;
};
