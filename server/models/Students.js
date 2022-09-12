const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Students = sequelize.define(
  "students",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthYear: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isAfter: "1900-01-01",
      },
    },
  },
  {
    underscored: true,
  }
);

module.exports = Students;
