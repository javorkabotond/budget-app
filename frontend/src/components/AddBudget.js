import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Button,
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent,
} from "@mui/material";
import budgetApi from "../api/budgetApi";
const categories = [
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
const AddBudget = () => {
  const [title, setTitle] = useState("");
  const [descreption, setDescreption] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      getBudgetbyId(location.state.id);
    }
  }, []);

  const getBudgetbyId = async (id) => {
    try {
      const budget = await budgetApi.getById(id);
      setTitle(budget.data.title);
      setDescreption(budget.data.descreption);
      setAmount(budget.data.amount);
      setCategory(budget.data.category);
      setDate(new Date());
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = {};
    query.title = title;
    query.descreption = descreption;
    query.amount = amount;
    query.category = category;
    query.date = date;

    if (location.state === null) {
      try {
        await budgetApi.save(query);
        navigate("/", { replace: true });
      } catch (error) {
        console.log("Hiba", error);
      }
    } else {
      try {
        query.id = location.state.id;
        await budgetApi.update(query);
        navigate("/", { replace: true });
      } catch (error) {
        console.log("Hiba", error);
      }
    }
  };
  return (
    <Container maxWidth="xl">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <h1>Add Budget</h1>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Descreption"
                  variant="outlined"
                  value={descreption}
                  onChange={(e) => setDescreption(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">
                    Category
                  </InputLabel>
                  <Select
                    id="demo-simple-select-filled-label"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Amount"
                  variant="outlined"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddBudget;
