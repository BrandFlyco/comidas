import { GoogleGenAI, Type } from "@google/genai";
import { MealType, Recipe } from "../types";

const apiKey = process.env.API_KEY;

// Initialize the client
const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateGroupRecipe = async (
  attendeesCount: number,
  mealType: MealType,
  restrictions: string
): Promise<Recipe> => {
  if (!apiKey) {
    throw new Error("API Key is missing via process.env.API_KEY");
  }

  const prompt = `
    Actúa como un Chef Ejecutivo Experto.
    Genera una receta perfecta para un grupo de ${attendeesCount} amigos.
    Tipo de comida: ${mealType}.
    Restricciones dietéticas o notas: ${restrictions || "Ninguna"}.
    
    La receta debe ser detallada, creativa pero realizable en casa.
    Calcula los ingredientes EXACTAMENTE para ${attendeesCount} personas.
    El idioma de respuesta debe ser Español.
  `;

  // Define the output schema strictly
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Nombre atractivo del plato" },
          description: { type: Type.STRING, description: "Breve descripción apetitosa (max 2 oraciones)" },
          difficulty: { type: Type.STRING, description: "Nivel de dificultad (Fácil, Medio, Difícil)" },
          time: { type: Type.STRING, description: "Tiempo total estimado (ej: 45 min)" },
          calories: { type: Type.STRING, description: "Calorías aproximadas por porción" },
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                item: { type: Type.STRING, description: "Nombre del ingrediente" },
                quantity: { type: Type.STRING, description: "Cantidad con unidad (ej: 500g, 2 cdas)" }
              },
              required: ["item", "quantity"]
            }
          },
          instructions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Pasos secuenciales para preparar la receta"
          }
        },
        required: ["title", "description", "difficulty", "time", "calories", "ingredients", "instructions"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No se recibió respuesta de la IA.");
  }

  try {
    return JSON.parse(text) as Recipe;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Error al procesar la receta generada.");
  }
};
