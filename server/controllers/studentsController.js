const catchAsync = require("../utils/catchAsync");
const Student = require("../models/Students");
const pagination = require("../utils/myFreamvorks/pagination");
const AppError = require("../utils/appError");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

exports.getAllStudents = catchAsync(async (req, res, next) => {
  const allStudents = await pagination(req.query, Student, {});
  if (allStudents.pagination.totalPages < req.query.page) {
    res.json({
      status: "success",
      message: "Hamma talabalarining ro'yxati berildi",
      error: null,
      data: { content: [], pagination: allStudents.pagination },
    });
  }
  res.json({
    status: "success",
    message: "Hamma talabalarining ro'yxati berildi",
    error: null,
    data: { ...allStudents },
  });
});

exports.getCourseIdStudents = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  if (!courseId) {
    return next(new AppError("Course Id kiritilmadi", 400));
  }
  const courseIdStudents = await pagination(req.query, Student, {
    where: { courseId: { [Op.eq]: courseId } },
  });
  res.json({
    status: "success",
    message: `Course id ${courseId}ga tegishli hamma talabalarining ro'yxati berildi`,
    error: null,
    data: { ...courseIdStudents },
  });
});

exports.getByIdStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const byId = await Student.findByPk(id);

  if (!byId) {
    next(new AppError(`Bu ${id} ID li  Talaba topilmadi`, 404));
  }

  res.json({
    status: "success",
    message: `${id} ID li talaba topildi`,
    error: null,
    data: {
      byId,
    },
  });
});

exports.createStudent = catchAsync(async (req, res, next) => {
  const validationError = validationResult(req);
  console.log(validationError);
  if (validationError.errors.length > 0) {
    const err = new AppError("Validation error", 400);
    err.operational = false;
    err.name = "validationError";
    err.errors = validationError.errors;
    return next(err);
  }
  const createdStudent = await Student.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Yangi talaba yaratildi",
    error: null,
    data: { createdStudent },
  });
});

exports.updateStudent = catchAsync(async (req, res, next) => {
  const validationError = validationResult(req);
  if (validationError.errors.length > 0) {
    const err = new AppError("Validation error", 400);
    err.operational = false;
    err.name = "validationError";
    err.errors = validationError.errors;
    return next(err);
  }
  const { id } = req.params;
  const byId = await Student.findByPk(id);
  if (!byId) {
    return next(new AppError(`Bu ${id} ID li  talaba topilmadi`, 404));
  }
  const updatedStudent = await byId.update(req.body);
  res.json({
    status: "success",
    message: `${id} ID li Talaba muvaffaqqiyatli tahrirlandi`,
    error: null,
    data: { updatedStudent },
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Student.findByPk(id);

  if (!byId) {
    return next(new AppError(`Bu${id} ID li  talaba topilmadi`, 404));
  }

  await byId.destroy();
  res.json({
    status: "success",
    message: `Bu ${id} ID li talaba muvaffaqiyatli olib tashlandi`,
    error: null,
    data: null,
  });
});
