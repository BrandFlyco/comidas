import { Friend, MealType } from './types';

export const FRIENDS_LIST: Friend[] = [
  { id: '1', name: 'Tobi' },
  { id: '2', name: 'Tomito' },
  { id: '3', name: 'Lucho' },
  { id: '4', name: 'Dami' },
  { id: '5', name: 'Blas' },
  { id: '6', name: 'Valen' },
  { id: '7', name: 'Facu' },
  { id: '8', name: 'Massi' },
];

export const MEAL_OPTIONS = [
  { value: MealType.DINNER, label: '🥗 Cena' },
  { value: MealType.LUNCH, label: '🍝 Almuerzo' },
  { value: MealType.BRUNCH, label: '🥞 Brunch' },
  { value: MealType.SNACK, label: '🧀 Picoteo' },
];
