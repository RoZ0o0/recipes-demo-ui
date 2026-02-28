import { Card, CardContent, Grid, Chip, Typography, Box } from "@mui/material";
import type { RecipeResponse } from "../../../../types/Recipe";

interface RecipeCardGridProps {
  recipes: RecipeResponse[];
}

const RecipeCardGrid = ({ recipes }: RecipeCardGridProps) => {
  const chipColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Grid container spacing={4} justifyContent="center">
      {recipes.map((recipe: RecipeResponse) => (
        <Grid sx={{ xs: 12, sm: 6, md: 4 }} key={recipe.id}>
          <Card
            sx={{
              height: 240,
              width: 360,
              display: "flex",
              flexDirection: "column",
            }}
            elevation={3}
          >
            <CardContent
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Typography variant="h6" component="h3" gutterBottom>
                {recipe.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  flexGrow: 1,
                }}
              >
                {recipe.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Chip
                  label={`${recipe.preparationTime} min`}
                  size="small"
                  color="default"
                />
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Chip
                    label={recipe.difficulty}
                    size="small"
                    color={chipColor(recipe.difficulty)}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeCardGrid;
