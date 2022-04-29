const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./model");
const corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(() => {
  console.log("Database connected...");
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
