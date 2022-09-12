const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Students = require("./Students");

const Courses = sequelize.define("courses", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

Courses.hasMany(Students, { as: "students" });
Students.belongsTo(Courses, { as: "course" });

module.exports = Courses;
