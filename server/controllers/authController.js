const { compare } = require("bcrypt");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const Admin = require("../models/User");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jsonWebToken = require("jsonwebtoken");
const { use, options } = require("../app");
const sendMailFn = require("../utils/email/email");

const findByUsername = async (username) => {
  const condidate = await Admin.findOne({
    where: { username: { [Op.eq]: username } },
  });

  if (condidate) {
    return condidate;
  } else {
    return null;
  }
};

const generateToken = (payload, jwtSecret, options) => {
  return new Promise((resolve, reject) => {
    jsonWebToken.sign(payload, jwtSecret, options, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const validationError = validationResult(req);
  if (validationError.errors.length > 0) {
    const err = new AppError("Validation error", 400);
    err.operational = false;
    err.name = "validationError";
    err.errors = validationError.errors;
    return next(err);
  }

  const existedUser = await findByUsername(req.body.username);

  if (existedUser) {
    return next(new AppError("Bunday foydalanuvchi mavjud", 409));
  }

  const createAdmin = await Admin.create(req.body);
  const payload = {
    id: createAdmin.id,
    firstName: createAdmin.firstName,
    lastName: createAdmin.lastName,
    role: createAdmin.role,
  };

  const condidate = await findByUsername(req.body.username);

  if (!condidate) {
    return next(
      `${req.body.username} Bunday Loginli foydalanuvchi mavjud emas`,
      404
    );
  }
  console.log(condidate.verificationCode);

  const mailInfo = sendMailFn(
    condidate.email,
    condidate.verificationCode,
    "We are IT COMPANY",
    next
  );

  res.status(201).json({
    status: "success",
    message:
      "Siz muvaffaqiyatli ro'yxatdan o'tdingiz email tarmog'ingiz orqali tekshirish parolini kiriting",
    errors: null,
    data: {
      createdNewAdmin: {
        ...payload,
      },
    },
  });
});

exports.verify = catchAsync(async (req, res, next) => {
  const condidate = await Admin.findOne({
    where: {
      verificationCode: { [Op.eq]: req.params.id },
    },
  });

  if (!condidate) {
    return next(
      new AppError(
        "Ushbu verificatsiya kodiga tegishli foydalanuvchi topilmadi",
        404
      )
    );
  }
  if (condidate.isVerify) {
    return next(
      new AppError(
        "Siz verificatsiyadan o'tgansiz Login va parolingizni kiritib dasturdan foydalanishingiz mumkin",
        400
      )
    );
  }

  await condidate.update({ isVerify: true });

  res.json({
    status: "success",
    message:
      "Verifikatsiyadan muvafaqiyatli o'tdingiz Login va Parolingizni kiritib dasturdan foydalanishingiz mumkin",
    error: null,
    data: null,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const validationError = validationResult(req);
  if (validationError.errors.length > 0) {
    const err = new AppError("Validation error", 400);
    err.operational = false;
    err.name = "validationError";
    err.errors = validationError.errors;
    return next(err);
  }

  const { password, username } = req.body;

  const condidate = await findByUsername(username);
  if (!condidate) {
    return next(new AppError("Login yoki Parol xato kiritildi", 400));
  }

  const passwordIsMatch = await compare(password, condidate.password);
  if (!passwordIsMatch) {
    return next(new AppError("Login yoki Parol xato kiritildi", 400));
  }

  const payload = {
    id: condidate.id,
    firstName: condidate.firstName,
    lastName: condidate.lastName,
    role: condidate.role,
  };

  const options = {
    algorithm: "HS512",
    expiresIn: "24h",
  };

  const token = await generateToken(payload, process.env.JWT_SECRET, options);
  res.json({
    status: "success",
    message: "",
    errors: null,
    data: {
      admin: {
        ...payload,
        jwt: token,
      },
    },
  });
});
