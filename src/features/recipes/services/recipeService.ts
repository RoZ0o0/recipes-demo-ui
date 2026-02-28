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
  sortBy?: string,
  direction?: "asc" | "desc",
): Promise<PaginatedRecipesResponse> => {
  const params = new URLSearchParams();
  params.set("search", search);
  params.set("page", String(page));
  params.set("size", String(size));

  if (sortBy) params.set("sortBy", sortBy);
  if (direction) params.set("direction", direction);

  const { data } = await api.get<PaginatedRecipesResponse>(
    `/recipe?${params.toString()}`,
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
