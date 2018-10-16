module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define(
    "Food",
    {
      food_name: DataTypes.STRING,
      measurement_unit: DataTypes.STRING,
      calorie_content: DataTypes.DOUBLE,
      fat_content: DataTypes.DOUBLE,
      protein_content: DataTypes.DOUBLE,
      carb_content: DataTypes.DOUBLE
    },
    { underscored: true }
  );

  Food.associate = models => {
    models.Food.belongsToMany(models.Meal, {
      through: models.MealFood
    });
  };

  return Food;
};
