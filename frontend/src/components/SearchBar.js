import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export const SearchBar = ({ onBudgetChange }) => {
  const [selectCategory, setSelectCategory] = useState("");
  const [selectTitle, setSelectTitle] = useState("");
  const handleSelectCategory = (event) => {
    setSelectCategory(event.target.value);
  };
  const handleSelectTitle = (event) => {
    const searchTitle = event.target.value;
    setSelectTitle(searchTitle);
  };
  const handleClickSearchButton = async () => {
    try {
      onBudgetChange(selectTitle, selectCategory);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        "& > :not(style)": { m: 1 },
      }}
    >
      <TextField
        label="Title"
        value={selectTitle}
        onChange={handleSelectTitle}
      />
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectCategory}
          label="Category"
          onChange={handleSelectCategory}
        >
          <MenuItem value={"ALL"}>All</MenuItem>;
          <MenuItem value={"SHOP"}>Shop</MenuItem>;
          <MenuItem value={"TRANSFER"}>Transfer</MenuItem>;
          <MenuItem value={"OTHER"}>Other</MenuItem>;
        </Select>
      </FormControl>

      <Button
        size="large"
        variant="contained"
        onClick={handleClickSearchButton}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        Search
      </Button>
    </Box>
  );
};
export default SearchBar;
