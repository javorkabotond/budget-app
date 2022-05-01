import React from "react";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export const DeleteButton = () => {
  return (
    <IconButton aria-label="delete" xs={{ mr: 3 }}>
      <FontAwesomeIcon icon={faTrash} />
    </IconButton>
  );
};
export default DeleteButton;
