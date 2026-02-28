import BaseDialog from "../../../../components/BaseDialog";
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import type { RecipeResponse } from "../../../../types/Recipe";
import type { ReactNode } from "react";

interface RecipePreviewDialogProps {
  open: boolean;
  onClose: () => void;
  recipe?: RecipeResponse | null;
  title?: string;
  actions?: ReactNode;
}

const RecipePreviewDialog = ({
  open,
  onClose,
  recipe,
  title,
}: RecipePreviewDialogProps) => {
  if (!recipe) return null;

  return (
    <BaseDialog
      isOpen={open}
      onClose={onClose}
      title={title || recipe.name}
      width={1200}
      maxWidth="lg"
    >
      <Box
        sx={{
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Description
        </Typography>
        <Typography variant="body2">{recipe.description}</Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 2, mt: 2 }}>
          <Chip label={`${recipe.preparationTime} min`} />
          <Chip label={recipe.difficulty} />
        </Box>

        <Typography variant="subtitle1">Ingredients</Typography>
        <List>
          {recipe.ingredients.map((ing) => (
            <ListItem key={ing.id} dense>
              <ListItemText
                primary={`${ing.name} — ${ing.quantity} ${ing.unit}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </BaseDialog>
  );
};

export default RecipePreviewDialog;
