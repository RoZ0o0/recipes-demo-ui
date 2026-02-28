import { MenuItem, Pagination, Select, Stack } from "@mui/material";

interface ListPaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  onSortByChange?: (sortBy: string) => void;
  onSortDirectionChange?: (dir: "asc" | "desc") => void;
  sortOptions?: { value: string; label: string }[];
  pageSizeOptions?: number[];
}

const ListPagination = ({
  page,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [6, 12, 24, 48],
  sortBy,
  sortDirection = "asc",
  onSortByChange,
  onSortDirectionChange,
  sortOptions = [
    { value: "name", label: "Name" },
    { value: "preparationTime", label: "Preparation time" },
  ],
}: ListPaginationProps) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Select
        value={sortBy ?? ""}
        displayEmpty
        size="small"
        onChange={(e) =>
          onSortByChange && onSortByChange(String(e.target.value))
        }
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">Sort by</MenuItem>
        {sortOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={sortDirection}
        size="small"
        onChange={(e) =>
          onSortDirectionChange &&
          onSortDirectionChange(e.target.value as "asc" | "desc")
        }
      >
        <MenuItem value="asc">Asc</MenuItem>
        <MenuItem value="desc">Desc</MenuItem>
      </Select>
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={(_, value) => onPageChange(value - 1)}
        color="primary"
      />
      <Select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        {pageSizeOptions.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default ListPagination;
