import { Button, Stack } from "@mui/material";
import BaseDialog from "../../../../components/BaseDialog";
import { useDeleteRecipe } from "../../hooks/useDeleteRecipe";
import type { RecipeResponse } from "../../../../types/Recipe";

interface RecipeDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  recipe?: RecipeResponse | null;
}

const RecipeDeleteDialog = ({
  open,
  onClose,
  recipe,
}: RecipeDeleteDialogProps) => {
  const deleteMutation = useDeleteRecipe();

  const handleOnClose = () => {
    onClose();
  };

  const handleAccept = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (recipe) {
        await deleteMutation.mutateAsync(recipe.id);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred";
      alert(message || "Delete failed");
    }
    onClose();
  };

  return (
    <>
      <BaseDialog
        isOpen={open}
        onClose={handleOnClose}
        width={300}
        title="Delete Recipe?"
      >
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" color="error" onClick={handleAccept}>
            Yes
          </Button>
          <Button variant="outlined" onClick={handleOnClose}>
            No
          </Button>
        </Stack>
      </BaseDialog>
    </>
  );
};

export default RecipeDeleteDialog;
