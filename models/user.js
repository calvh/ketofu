module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_name: DataTypes.STRING,
      dob: DataTypes.DATEONLY,
      weight: DataTypes.DOUBLE,
      height: DataTypes.DOUBLE,
      fat_percentage: DataTypes.DOUBLE,
      target_weight: DataTypes.DOUBLE,
      target_fat_percentage: DataTypes.DOUBLE,
      daily_calorie_limit: DataTypes.DOUBLE
    },
    { underscored: true }
  );

  User.associate = models => {
    models.User.hasMany(models.Meal);
  };

  return User;
};
