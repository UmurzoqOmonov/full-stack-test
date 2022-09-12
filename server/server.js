require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 2000;
const devOrProd = process.env.NODE_ENV;
const db = require("./config/db");

// Tables
const Admin = require("./models/User");
const Courses = require("./models/Courses");
const Students = require("./models/Students");

db.authenticate()
  .then(() => {
    console.log("Database connected");
    db.sync();
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server ${devOrProd} started on Port ${PORT}`);
});
