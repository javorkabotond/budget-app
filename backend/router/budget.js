const router = require("express").Router();
const budgetService = require("../controller/budgetController");
router.post("/create", budgetService.insertBudget);
module.exports = router;
