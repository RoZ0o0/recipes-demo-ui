import { useState } from "react";
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
import type { ReactNode } from "react";
import type { IngredientRequest } from "../../../../types/Ingredient";
import type { RecipeRequest } from "../../../../types/Recipe";
import { useCreateRecipe } from "../../hooks/useCreateRecipe";

interface RecipeFormDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  actions?: ReactNode;
}

const defaultIngredient = (): IngredientRequest => ({
  name: "",
  quantity: 0,
  unit: "G",
});

const units = ["G", "KG", "ML", "CUP", "TBSP", "TSP", "PIECE"] as const;
const difficulties = ["EASY", "MEDIUM", "HARD"] as const;

const RecipeFormDialog = ({ open, onClose, title }: RecipeFormDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [preparationTime, setPreparationTime] = useState<number>(0);
  const [difficulty, setDifficulty] =
    useState<(typeof difficulties)[number]>("EASY");
  const [ingredients, setIngredients] = useState<IngredientRequest[]>([
    defaultIngredient(),
  ]);

  const createMutation = useCreateRecipe();

  const resetForm = () => {
    setName("");
    setDescription("");
    setPreparationTime(0);
    setDifficulty("EASY");
    setIngredients([defaultIngredient()]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const addIngredient = () =>
    setIngredients((s) => [...s, defaultIngredient()]);
  const removeIngredient = (idx: number) =>
    setIngredients((s) => s.filter((_, i) => i !== idx));
  const updateIngredient = (
    idx: number,
    field: keyof IngredientRequest,
    value: string | number,
  ) => {
    setIngredients((s) =>
      s.map((ing, i) => (i === idx ? { ...ing, [field]: value } : ing)),
    );
  };

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Name is required");
    const payload: RecipeRequest = {
      name,
      description,
      difficulty: difficulty as RecipeRequest["difficulty"],
      preparationTime,
      ingredients: ingredients.map((ing) => ({
        name: ing.name,
        quantity: Number(ing.quantity),
        unit: ing.unit,
      })),
    };

    try {
      await createMutation.mutateAsync(payload);
      onClose();
      setName("");
      setDescription("");
      setPreparationTime(0);
      setDifficulty("EASY");
      setIngredients([defaultIngredient()]);
    } catch (err: any) {
      alert(err?.message || "Create failed");
    }
  };

  return (
    <BaseDialog
      isOpen={open}
      onClose={handleClose}
      title={title || "Add Recipe"}
    >
      <Box sx={{ maxWidth: 800, width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Add Recipe
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Preparation time (mins)"
              type="number"
              value={preparationTime}
              onChange={(e) => setPreparationTime(Number(e.target.value))}
            />
            <Select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
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
              {ingredients.map((ing, idx) => (
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
              Save
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Stack>
        </Stack>
      </Box>
    </BaseDialog>
  );
};

export default RecipeFormDialog;
