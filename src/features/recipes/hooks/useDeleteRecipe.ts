import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe } from "../services/recipeService";

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationKey: ["deleteRecipe"],
    mutationFn: (recipeId: number) => deleteRecipe(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};
