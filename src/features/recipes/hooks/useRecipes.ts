import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../services/recipeService";
import type { PaginatedRecipesResponse } from "../../../types/Recipe";

export const useRecipes = (
  search: string,
  page: number = 0,
  size: number = 5,
  sortBy?: string,
  direction?: "asc" | "desc",
) => {
  return useQuery<PaginatedRecipesResponse, Error>({
    queryKey: ["recipes", search, page, size, sortBy, direction],
    queryFn: () => getRecipes(search, page, size, sortBy, direction),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
