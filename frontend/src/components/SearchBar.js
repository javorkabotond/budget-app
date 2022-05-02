import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Container,
} from "@mui/material";
const categories = [
  {
    name: "None",
    value: "",
  },
  {
    name: "Shop",
    value: "SHOP",
  },
  {
    name: "Transfer",
    value: "TRANSFER",
  },
  {
    name: "Other",
    value: "OTHER",
  },
];

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
    <Container maxWidth="xl">
      <Box sx={{ mb: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                label="Title"
                value={selectTitle}
                onChange={handleSelectTitle}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Category
              </InputLabel>
              <Select
                id="demo-simple-select-filled-label"
                value={selectCategory}
                onChange={handleSelectCategory}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={1}>
            <FormControl fullWidth>
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={handleClickSearchButton}
              >
                Search
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default SearchBar;
