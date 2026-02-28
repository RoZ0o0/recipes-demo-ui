import api from "../../../services/api";
import type {
  PaginatedRecipesResponse,
  RecipeRequest,
  RecipeResponse,
} from "../../../types/Recipe";

export const getRecipes = async (
  search: string,
  page: number = 0,
  size: number = 5,
): Promise<PaginatedRecipesResponse> => {
  const { data } = await api.get<PaginatedRecipesResponse>(
    `/recipe?search=${search}&page=${page}&size=${size}`,
  );
  return data;
};

export const createRecipe = async (
  recipe: RecipeRequest,
): Promise<RecipeResponse> => {
  const response = await api.post<RecipeResponse>("/recipe", recipe);
  return response.data;
};

export const getRecipeById = async (
  recipeId: number,
): Promise<RecipeResponse> => {
  const response = await api.get<RecipeResponse>(`/recipe/${recipeId}`);
  return response.data;
};

export const deleteRecipe = async (recipeId: number): Promise<void> => {
  await api.delete(`/recipe/${recipeId}`);
};

export const updateRecipe = async (
  recipeId: number,
  recipe: RecipeRequest,
): Promise<RecipeResponse> => {
  const response = await api.put<RecipeResponse>(`/recipe/${recipeId}`, recipe);
  return response.data;
};
