const express = require("express");
const { body } = require("express-validator");
const studentControllers = require("../controllers/studentsController");
const router = express.Router();

router
  .route("/")
  .get(studentControllers.getAllStudents)
  .post(
    body("firstName")
      .notEmpty()
      .withMessage("Talabaning ismi bo'sh bo'lishi mumkin emas")
      .isLength({ min: 3 })
      .withMessage(
        "Talabaning ismi eng kamida 3 ta harfdan iborat bo'lishi kerak"
      ),
    body("lastName")
      .notEmpty()
      .withMessage("Talabaning familiyasi bo'sh bo'lishi mumkin emas")
      .isLength({ min: 5 })
      .withMessage(
        "Talabaning familiyasi eng kamida 5 ta harfdan iborat bo'lishi kerak"
      ),
    body("birthYear")
      .notEmpty()
      .withMessage(
        "Talabaning tug'ilgan sanasi bo'sh bo'lishi mumkin emas. Misol:'2000-01-01"
      )
      .isLength({ min: 10, max: 10 })
      .withMessage(
        "Talabaning tug'ilgan sanasi 10 ta belgidan iborat bo'lishi kerak. Misol:'2000-01-01'"
      ),
    studentControllers.createStudent
  );

router
  .route("/:id")
  .get(studentControllers.getByIdStudent)
  .put(
    body("firstName")
      .notEmpty()
      .withMessage("Talabaning ismi bo'sh bo'lishi mumkin emas")
      .isLength({ min: 3 })
      .withMessage(
        "Talabaning ismi eng kamida 3 ta harfdan iborat bo'lishi kerak"
      ),
    body("lastName")
      .notEmpty()
      .withMessage("Talabaning familiyasi bo'sh bo'lishi mumkin emas")
      .isLength({ min: 5 })
      .withMessage(
        "Talabaning familiyasi eng kamida 5 ta harfdan iborat bo'lishi kerak"
      ),
    body("birthYear")
      .notEmpty()
      .withMessage(
        "Talabaning tug'ilgan sanasi bo'sh bo'lishi mumkin emas. Misol:'2000-01-01"
      )
      .isLength({ min: 5 })
      .withMessage(
        "Talabaning tug'ilgan sanasi 10 ta belgidan iborat bo'lishi kerak. Misol:'2000-01-01'"
      ),
    studentControllers.updateStudent
  )
  .delete(studentControllers.deleteStudent);
router.get("/:courseId", studentControllers.getCourseIdStudents);

module.exports = router;
