import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RecipeRequest, RecipeResponse } from "../../../types/Recipe";
import { createRecipe } from "../services/recipeService";

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<RecipeResponse, Error, RecipeRequest>({
    mutationKey: ["createRecipe"],
    mutationFn: (recipe: RecipeRequest) => createRecipe(recipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};
