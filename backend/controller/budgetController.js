const db = require("../model");
const Budget = db.budget;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

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
    response.send({ message: "Budget successful save" });
  } catch (error) {
    response.status(500).send({
      message: error.message,
    });
  }
};

exports.getAllBudgets = async (request, response) => {
  try {
    const budgets = await Budget.findAll();
    response.send(budgets);
  } catch (error) {
    response.status(500).send({
      message: error.message,
    });
  }
};

exports.getAllBudgetsByCategory = async (request, response) => {
  try {
    const budgets = await Budget.findAll({
      attributes: [
        "category",
        [sequelize.fn("SUM", sequelize.col("amount")), "total_amount"],
      ],
      group: "category",
    });
    response.send(budgets);
  } catch (error) {
    response.status(500).send({
      message: error.message,
    });
  }
};

exports.getBudgetById = async (request, response) => {
  try {
    const id = request.params.id;
    const budget = await Budget.findByPk(id);
    response.send(budget);
  } catch (error) {
    response.status(404).send({
      message: `Cannot find budget with id: .`,
    });
  }
};

exports.getBudgetsByCondition = async (request, response) => {
  try {
    const title = request.query.title;
    const category = request.query.category;
    const titleCondition = title
      ? { title: { [Op.like]: `%${title}%` } }
      : null;
    const categoryCondition = category
      ? { category: { [Op.eq]: category } }
      : null;

    const budgets = await Budget.findAll({
      where: {
        [Op.and]: [titleCondition, categoryCondition],
      },
    });
    response.status(200).send(budgets);
  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: error,
    });
  }
};

exports.updateBudget = async (request, response) => {
  const id = request.params.id;
  const { title, descreption, amount, category, date } = request.body;
  const findBudgetById = await Budget.findOne({
    where: {
      id,
    },
  });
  if (!findBudgetById) {
    response.status(404).send({
      message: `Budget with id: ${id} not found`,
    });
    return;
  }
  if (!title || !descreption || !amount || !category || !date) {
    response.status(400).send({
      message: "Value cannot be NULL!",
    });
    return;
  }
  const updateBudget = await Budget.update(
    {
      title,
      descreption,
      amount,
      category,
      date,
    },
    { where: { id: id } }
  );
  if (!updateBudget) {
    response.status(400).send({
      message: `Budget with id: ${id} failed update`,
    });
  }
  response.status(200).send({
    message: `Budget with id: ${id} success update`,
  });
};
exports.deleteBudget = async (request, response) => {
  try {
    const id = request.params.id;
    const findBudgetById = await Budget.findByPk(id);
    if (!findBudgetById) {
      response.status(404).send({
        message: `Budget with id: ${id} not found`,
      });
      return;
    }

    const deleteBerons = findBudgetById.destroy();
    if (!deleteBerons) {
      response.status(404).send({
        message: `Budget with id: ${id} not found`,
      });
      return;
    }
    response.send({ message: "Budget successful delete" });
  } catch (error) {
    response.status(500).send({
      message: "Could not delete budget with id:" + id,
    });
  }
};
