module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
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
          isBefore: new Date()
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
