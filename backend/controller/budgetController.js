const db = require("../model");
const Budget = db.budget;

exports.insertBudget = async (request, response) => {
  try {
    const { title, descreption, amount, category, date } = request.body;
    if (!title || !descreption || !amount || !category || !date) {
      response.status(400).send({
        message: "Value cannot be NULL!",
      });
      return;
    }
    const budget = await Budget.create({
      title,
      descreption,
      amount,
      category,
      date,
    });
    response.send(budget);
  } catch (error) {
    response.status(500).send({
      message: error.message,
    });
  }
};
