import React from "react";
import { Button, Modal, Box, Grid, FormControl } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export const DeleteModal = ({ message, onDialog, show }) => {
  return (
    <Modal
      hideBackdrop
      open={show}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 300 }}>
        <p id="child-modal-description">{message}</p>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Button onClick={() => onDialog(true)}>Yes</Button>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Button onClick={() => onDialog(false)}>No</Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
export default DeleteModal;
