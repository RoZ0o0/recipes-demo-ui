import { useQuery } from "@tanstack/react-query";
import type { RecipeResponse } from "../../../types/Recipe";
import { getRecipeById } from "../services/recipeService";

export const useRecipe = (recipeId: number) => {
  return useQuery<RecipeResponse, Error>({
    queryKey: ["recipe", recipeId],
    queryFn: () => getRecipeById(recipeId),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
