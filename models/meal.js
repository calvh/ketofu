module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define(
    "Meal",
    {
      meal_name: DataTypes.STRING
    },
    { underscored: true }
  );

  Meal.associate = models => {
    models.Meal.belongsTo(models.User);
    models.Meal.belongsToMany(models.Food, {
      through: models.MealFood
    });
  };

  return Meal;
};
