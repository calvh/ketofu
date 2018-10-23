module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      gender: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["M", "F"]]
        }
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: { msg: "Invalid email format." } }
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      dob: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: { msg: "Invalid date." },
          isBefore: DataTypes.NOW
        }
      },

      height_in: {
        type: DataTypes.DOUBLE,
        validate: {
          isNumeric: true,
          min: 1
        }
      }
    },
    { underscored: true }
  );

  User.associate = models => {
    User.hasMany(models.Log, {
      onDelete: "cascade"
    });
  };

  return User;
};
