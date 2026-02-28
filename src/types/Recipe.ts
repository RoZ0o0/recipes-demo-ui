import type { IngredientRequest, IngredientResponse } from "./Ingredient";

export type RecipeDifficulty = "EASY" | "MEDIUM" | "HARD";

export type RecipeResponse = {
  id: number;
  name: string;
  description: string;
  ingredients: IngredientResponse[];
  difficulty: RecipeDifficulty;
  preparationTime: number;
  createdAt: string;
};

export type RecipeRequest = {
  name: string;
  description: string;
  ingredients: IngredientRequest[];
  difficulty: RecipeDifficulty;
  preparationTime: number;
};

export type PaginatedRecipesResponse = {
  content: RecipeResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};
