import React, { useEffect, useState } from "react";
import budgetApi from "../api/budgetApi";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import SearchBar from "./SearchBar";
export const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    getBudgets();
  }, []);

  const getBudgets = async () => {
    try {
      const response = await budgetApi.getAll();
      setBudgets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchBudgets = async (selectTitle, selectCategory) => {
    try {
      console.log(selectTitle, selectCategory);
      let query = {};
      query.title = selectTitle;
      query.category = selectCategory;
      const response = await budgetApi.search(query);
      setBudgets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SearchBar onBudgetChange={searchBudgets} />
      <TableContainer sx={{ maxHeight: "300px" }} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Descreption</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets.map((budget) => (
              <TableRow
                key={budget.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{budget.title}</TableCell>
                <TableCell>{budget.descreption}</TableCell>
                <TableCell>{budget.amount}</TableCell>
                <TableCell>{budget.category}</TableCell>
                <TableCell align="center">{budget.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BudgetList;
