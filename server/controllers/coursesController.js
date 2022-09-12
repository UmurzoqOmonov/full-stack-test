const catchAsync = require("../utils/catchAsync");
const Course = require("../models/Courses");
const pagination = require("../utils/myFreamvorks/pagination");
const AppError = require("../utils/appError");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const Students = require("../models/Students");

exports.getAllCourses = catchAsync(async (req, res, next) => {
  const allCourse = await pagination(req.query, Course, {});

  if (allCourse.pagination.totalPages < req.query.page) {
    res.json({
      status: "success",
      message: "Hamma kurslarining ro'yxati berildi",
      error: null,
      data: { content: [], pagination: allCourse.pagination },
    });
  }
  res.json({
    status: "success",
    message: "Hamma kurslarining ro'yxati berildi",
    error: null,
    data: { ...allCourse },
  });
});

exports.getByIdCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Course.findByPk(id);
  if (!byId) {
    next(new AppError(`Bu ${id} ID li  Kurs topilmadi`, 404));
  }

  res.json({
    status: "success",
    message: `${id} ID li kurs topildi`,
    error: null,
    data: {
      byId,
    },
  });
});

exports.getByIdCourseStudents = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Course.findOne({
    where: {
      id: { [Op.eq]: id },
    },
    include: ["students"],
  });
  if (!byId) {
    next(new AppError(`Bu ${id} ID li  Kurs topilmadi`, 404));
  }

  res.json({
    status: "success",
    message: `${id} ID li kurs topildi`,
    error: null,
    data: {
      byId,
    },
  });
});

exports.createCourse = catchAsync(async (req, res, next) => {
  const validationError = validationResult(req);
  if (validationError.errors.length > 0) {
    const err = new AppError("Validation error", 400);
    err.operational = false;
    err.name = "validationError";
    err.errors = validationError.errors;
    return next(err);
  }
  const createdCourse = await Course.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Yangi kurs yaratildi",
    error: null,
    data: { createdCourse },
  });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
  const validationError = validationResult(req);
  if (validationError.errors.length > 0) {
    const err = new AppError("Validation error", 400);
    err.operational = false;
    err.name = "validationError";
    err.errors = validationError.errors;
    return next(err);
  }
  const { id } = req.params;
  const byId = await Course.findByPk(id);
  if (!byId) {
    return next(new AppError(`Bu ${id} ID li  kurs topilmadi`, 404));
  }
  const updatedCourse = await byId.update(req.body);
  res.json({
    status: "success",
    message: `${id} ID li Kurs muvaffaqqiyatli tahrirlandi`,
    error: null,
    data: { updatedCourse },
  });
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Course.findByPk(id);

  if (!byId) {
    return next(new AppError(`Bu${id} ID li  kurs topilmadi`, 404));
  }

  await byId.destroy();

  res.json({
    status: "success",
    message: `Bu ${id} ID li kurs muvaffaqiyatli olib tashlandi`,
    error: null,
    data: null,
  });
});
