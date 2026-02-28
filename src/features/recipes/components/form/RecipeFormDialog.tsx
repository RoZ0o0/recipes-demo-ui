import { useEffect, useState } from "react";
import BaseDialog from "../../../../components/BaseDialog";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCreateRecipe } from "../../hooks/useCreateRecipe";
import { useUpdateRecipe } from "../../hooks/useUpdateRecipe";
import type { ReactNode } from "react";
import type {
  IngredientRequest,
  IngredientUnit,
} from "../../../../types/Ingredient";
import type {
  RecipeRequest,
  RecipeDifficulty,
  RecipeResponse,
} from "../../../../types/Recipe";

interface RecipeFormDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  actions?: ReactNode;
  recipe?: RecipeResponse | null;
}

const defaultIngredient = (): IngredientRequest => ({
  name: "",
  quantity: 0,
  unit: "G",
});

const units: IngredientUnit[] = [
  "G",
  "KG",
  "ML",
  "CUP",
  "TBSP",
  "TSP",
  "PIECE",
];
const difficulties: RecipeDifficulty[] = ["EASY", "MEDIUM", "HARD"];

export type FormData = Omit<RecipeRequest, "ingredients"> & {
  ingredients: IngredientRequest[];
};

const initialForm: FormData = {
  name: "",
  description: "",
  preparationTime: 0,
  difficulty: "EASY",
  ingredients: [defaultIngredient()],
};

const RecipeFormDialog = ({
  open,
  onClose,
  title,
  recipe,
}: RecipeFormDialogProps) => {
  const [form, setForm] = useState<FormData>(initialForm);

  const createMutation = useCreateRecipe();
  const updateMutation = useUpdateRecipe();

  const resetForm = () => {
    setForm(initialForm);
  };

  useEffect(() => {
    if (open) {
      if (recipe) {
        setForm({
          name: recipe.name,
          description: recipe.description,
          preparationTime: recipe.preparationTime,
          difficulty: recipe.difficulty,
          ingredients: recipe.ingredients.map((ing) => ({
            id: ing.id,
            name: ing.name,
            quantity: ing.quantity,
            unit: ing.unit,
          })),
        });
      }
    } else {
      resetForm();
    }
  }, [open, recipe]);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const addIngredient = () =>
    setForm((f) => ({
      ...f,
      ingredients: [...f.ingredients, defaultIngredient()],
    }));

  const removeIngredient = (idx: number) =>
    setForm((f) => ({
      ...f,
      ingredients: f.ingredients.filter((_, i) => i !== idx),
    }));

  const updateIngredient = (
    idx: number,
    field: keyof IngredientRequest,
    value: string | number,
  ) => {
    setForm((f) => ({
      ...f,
      ingredients: f.ingredients.map((ing, i) =>
        i === idx ? { ...ing, [field]: value } : ing,
      ),
    }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) return alert("Name is required");
    const payload: RecipeRequest = {
      name: form.name,
      description: form.description,
      difficulty: form.difficulty as RecipeRequest["difficulty"],
      preparationTime: form.preparationTime,
      ingredients: form.ingredients.map((ing) => ({
        ...(ing.id ? { id: ing.id } : {}),
        name: ing.name,
        quantity: Number(ing.quantity),
        unit: ing.unit,
      })),
    };

    try {
      if (recipe) {
        await updateMutation.mutateAsync({
          recipeId: recipe.id,
          recipe: payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onClose();
      resetForm();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred";
      alert(message || (recipe ? "Update failed" : "Create failed"));
    }
  };

  const defaultTitle = recipe ? "Edit Recipe" : "Add Recipe";

  return (
    <BaseDialog
      isOpen={open}
      onClose={handleClose}
      title={title || defaultTitle}
    >
      <Box sx={{ maxWidth: 800, width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          {recipe ? "Edit Recipe" : "Add Recipe"}
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            fullWidth
          />

          <TextField
            label="Description"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            multiline
            rows={4}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Preparation time (mins)"
              type="number"
              value={form.preparationTime}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  preparationTime: Number(e.target.value),
                }))
              }
            />
            <Select
              value={form.difficulty}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  difficulty: e.target.value as RecipeDifficulty,
                }))
              }
            >
              {difficulties.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Box>
            <Typography variant="subtitle1">Ingredients</Typography>
            <Stack spacing={1} sx={{ mt: 1 }}>
              {form.ingredients.map((ing, idx) => (
                <Stack
                  key={idx}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <TextField
                    label="Name"
                    value={ing.name}
                    onChange={(e) =>
                      updateIngredient(idx, "name", e.target.value)
                    }
                    size="small"
                  />
                  <TextField
                    label="Qty"
                    type="number"
                    value={ing.quantity}
                    onChange={(e) =>
                      updateIngredient(idx, "quantity", Number(e.target.value))
                    }
                    size="small"
                    sx={{ width: 100 }}
                  />
                  <Select
                    value={ing.unit}
                    onChange={(e) =>
                      updateIngredient(idx, "unit", e.target.value)
                    }
                    size="small"
                  >
                    {units.map((u) => (
                      <MenuItem key={u} value={u}>
                        {u}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button color="error" onClick={() => removeIngredient(idx)}>
                    Remove
                  </Button>
                </Stack>
              ))}
              <Button onClick={addIngredient}>Add ingredient</Button>
            </Stack>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleSubmit}>
              {recipe ? "Update" : "Save"}
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Stack>
        </Stack>
      </Box>
    </BaseDialog>
  );
};

export default RecipeFormDialog;
