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
import DeleteModal from "./DeleteModal";
export const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);
  const [dialog, setDialog] = useState({
    message: "",
    show: false,
  });
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);
  useEffect(() => {
    getBudgets();
  }, []);

  const refreshList = () => {
    getBudgets();
  };

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
  const handleDialog = (message, show) => {
    setDialog({
      message,
      show,
    });
  };
  const areUSureDelete = (choose) => {
    if (choose) {
      deleteItem();
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  const deleteItem = async () => {
    try {
      await budgetApi.delete(deleteItemId);
      refreshList();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (id) => {
    handleDialog("Are you sure you want to delete budget item?", true);
    setDeleteItemId(id);
  };

  const handleUpdate = async (id) => {
    try {
      const budget = await budgetApi.getById(id);
      setUpdateItem(budget);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xl">
      <DeleteModal
        show={dialog.show}
        onDialog={areUSureDelete}
        message={dialog.message}
      />
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
                  <IconButton
                    aria-label="update"
                    xs={{ mr: 3 }}
                    onClick={() => handleUpdate(budget.id)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    xs={{ mr: 3 }}
                    onClick={() => handleDelete(budget.id)}
                  >
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
