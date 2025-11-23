export interface Friend {
  id: string;
  name: string;
}

export enum MealType {
  DINNER = 'Cena',
  LUNCH = 'Almuerzo',
  BRUNCH = 'Brunch',
  SNACK = 'Picoteo',
}

export interface Ingredient {
  item: string;
  quantity: string;
}

export interface Recipe {
  title: string;
  description: string;
  difficulty: string;
  time: string;
  calories: string;
  ingredients: Ingredient[];
  instructions: string[];
}
