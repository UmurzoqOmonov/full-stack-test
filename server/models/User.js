const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [5],
          msg: "Login eng kamida 5ta belgidan ibporat bo'lishi kerak",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "Parol kamida 6ta belgidan iborat bo'lishi kerak ",
        },
      },
    },
    role: {
      type: DataTypes.ENUM("SUPER_ADMIN", "ADMIN"),
      allowNull: false,
      defaultValue: "ADMIN",
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [12],
          msg: "Telefon raqami eng kamida 13 ta belgidan iborat bo'lsin",
        },
      },
    },
    verificationCode: {
      type: DataTypes.STRING,
      defaultValue: `${Math.floor(1000 + Math.random() * 9000)}`,
      // unique: true,
      // defaultValue: UUIDV4,FOR EMAIL
    },
    isVerify: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 8);
      },
    },
  }
);

module.exports = User;
