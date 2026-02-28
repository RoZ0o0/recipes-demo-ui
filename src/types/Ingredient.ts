export type IngredientUnit =
  | "G"
  | "KG"
  | "ML"
  | "CUP"
  | "TBSP"
  | "TSP"
  | "PIECE";

export type IngredientResponse = {
  id: number;
  name: string;
  quantity: number;
  unit: IngredientUnit;
};

export type IngredientRequest = {
  id?: number;
  name: string;
  quantity: number;
  unit: IngredientUnit;
};
