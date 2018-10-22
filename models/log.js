module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    "Log",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      age: {
        type: DataTypes.INTEGER
      },
      gender: {
        type: DataTypes.STRING
      },
      weight_lb: {
        type: DataTypes.DOUBLE
      },
      height_in: {
        type: DataTypes.DOUBLE
      },
      act_lvl: {
        type: DataTypes.DOUBLE
      },
      fat_pct: {
        type: DataTypes.DOUBLE
      },
      cal_deficit: {
        type: DataTypes.DOUBLE
      },
      net_carbs: {
        type: DataTypes.DOUBLE
      }
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
