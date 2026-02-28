import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RecipeRequest, RecipeResponse } from "../../../types/Recipe";
import { updateRecipe } from "../services/recipeService";

interface UpdateRecipeParams {
  recipeId: number;
  recipe: RecipeRequest;
}

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<RecipeResponse, Error, UpdateRecipeParams>({
    mutationKey: ["updateRecipe"],
    mutationFn: ({ recipeId, recipe }: UpdateRecipeParams) =>
      updateRecipe(recipeId, recipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};
