const router = require("express").Router();
const budgetService = require("../controller/budgetController");

router.post("/create", budgetService.insertBudget);
router.get("/budgets", budgetService.getAllBudgets);
router.get("/budget/:id", budgetService.getBudgetById);

module.exports = router;
