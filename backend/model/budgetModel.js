module.exports = (sequelize, Sequelize) => {
  const Budget = sequelize.define(
    "budgets",
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descreption: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM("SHOP", "TRANSFER", "OTHER"),
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Budget;
};
