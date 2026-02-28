import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      placeholder={placeholder || "Search…"}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default SearchInput;
