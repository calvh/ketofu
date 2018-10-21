module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    "Log",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      entry_date: DataTypes.DATEONLY,
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      weight_lb: DataTypes.DOUBLE,
      height_in: DataTypes.DOUBLE,
      act_lvl: DataTypes.DOUBLE,
      fat_pct: DataTypes.DOUBLE,
      cal_deficit: DataTypes.DOUBLE,
      net_carbs: DataTypes.DOUBLE
    },
    { underscored: true }
  );

  Log.associate = models => {
    Log.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Log;
};
