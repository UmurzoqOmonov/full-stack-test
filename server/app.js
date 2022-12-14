const express = require("express");
const cors = require("cors");
const AppError = require("./utils/appError");
const errorController = require("./controllers/errorController");
const courseRouter = require("./routes/courseRouter");
const studentRouter = require("./routes/studentRouter");
const authRouter = require("./routes/authRouter");
const nodemailer = require("nodemailer");
const authMiddleware = require("./middlewares/authMiddlewares");
// Create Express App
const app = express();

// MiddleWares
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api/v1/admin/students", studentRouter);
// app.use("/api/v1/users", authRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/students", authMiddleware, studentRouter);
app.use("/api/v1/courses", authMiddleware, courseRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Path ${req.path} not exists`, 404));
});

app.use(errorController);

module.exports = app;
