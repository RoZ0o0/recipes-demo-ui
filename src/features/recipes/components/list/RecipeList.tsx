import { useState } from "react";
import { useRecipes } from "../../hooks/useRecipes";
import { CircularProgress, Typography, Box } from "@mui/material";
import ListPagination from "../../../../components/ListPagination";
import RecipeCardGrid from "./RecipeCardGrid";
import SearchInput from "../../../../components/SearchInput";

const RecipeList = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [invoiceSearch, setInvoiceSearch] = useState("");

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
            <RecipeCardGrid recipes={data.content} />
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
