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
  Container,
  IconButton,
} from "@mui/material";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
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
    <Container maxWidth="xl">
      <SearchBar onBudgetChange={searchBudgets} />
      <TableContainer sx={{ maxHeight: "1000px" }} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Descreption</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Methods</TableCell>
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
                <TableCell>{budget.date}</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="delete" xs={{ mr: 3 }}>
                    <FontAwesomeIcon icon={faPen} />
                  </IconButton>
                  <IconButton aria-label="delete" xs={{ mr: 3 }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BudgetList;
