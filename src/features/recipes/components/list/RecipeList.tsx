import { useState } from "react";
import { useRecipes } from "../../hooks/useRecipes";
import { CircularProgress, Typography, Box, Button } from "@mui/material";
import ListPagination from "../../../../components/ListPagination";
import RecipeCardGrid from "./RecipeCardGrid";
import SearchInput from "../../../../components/SearchInput";
import RecipeFormDialog from "../form/RecipeFormDialog";
import RecipePreviewDialog from "../preview/RecipePreviewDialog";
import type { RecipeResponse } from "../../../../types/Recipe";

const RecipeList = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeResponse | null>(
    null,
  );

  const { data, isLoading, isError, error } = useRecipes(
    invoiceSearch,
    page,
    size,
    sortBy,
    direction,
  );

  const handlePageSizeChange = (newSize: number) => {
    setSize(newSize);
    setPage(0);
  };

  return (
    <div className="flex justify-center p-6 w-full h-full">
      {!isLoading && !isError && data && (
        <div className="w-full flex flex-col gap-y-4">
          <Box className="relative mb-6 w-full flex items-center">
            <Box className="flex items-center space-x-2">
              <Button variant="contained" onClick={() => setCreateOpen(true)}>
                Add Recipe
              </Button>
            </Box>

            <Typography
              variant="h4"
              className="font-bold absolute left-1/2 transform -translate-x-1/2"
            >
              Recipe List
            </Typography>

            <Box className="ml-auto flex items-center">
              <Box className="w-64">
                <SearchInput
                  value={invoiceSearch}
                  onChange={setInvoiceSearch}
                  placeholder="Search recipes..."
                />
              </Box>
            </Box>
          </Box>

          <div className="grow">
            <RecipeCardGrid
              recipes={data.content}
              onPreview={(r) => {
                setSelectedRecipe(r);
                setPreviewOpen(true);
              }}
            />
          </div>

          <div className="flex justify-center">
            <ListPagination
              page={page}
              totalPages={data?.totalPages}
              pageSize={size}
              onPageChange={setPage}
              onPageSizeChange={handlePageSizeChange}
              sortBy={sortBy}
              sortDirection={direction}
              onSortByChange={(s) => {
                setSortBy(s || undefined);
                setPage(0);
              }}
              onSortDirectionChange={(d) => {
                setDirection(d);
                setPage(0);
              }}
            />
          </div>
          <RecipeFormDialog
            open={createOpen}
            onClose={() => setCreateOpen(false)}
          />
          <RecipePreviewDialog
            open={previewOpen}
            onClose={() => setPreviewOpen(false)}
            recipe={selectedRecipe}
          />
        </div>
      )}
      {isLoading && (
        <div className="flex flex-1 justify-center items-center">
          <CircularProgress />
        </div>
      )}
      {isError && (
        <div className="flex flex-1 justify-center items-center">
          <h2 className="font-bold">{error.message}</h2>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
