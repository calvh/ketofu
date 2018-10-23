module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    "Log",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      entry_date: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: { msg: "Invalid date." }
        }
      },

      weight_lb: {
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
