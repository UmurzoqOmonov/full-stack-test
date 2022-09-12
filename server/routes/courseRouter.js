const express = require("express");
const { body } = require("express-validator");
const courseControllers = require("../controllers/coursesController");
const router = express.Router();

router
  .route("/")
  .get(courseControllers.getAllCourses)
  .post(
    body("name")
      .notEmpty()
      .withMessage("Kursning nomi bo'sh bo'lishi mumkin emas")
      .isLength({ min: 4 })
      .withMessage("Kurs nomi eng kamida 4 ta belgidan iborat bo'lishi kerak"),
    courseControllers.createCourse
  );

router.get("/:id/students", courseControllers.getByIdCourseStudents);

router
  .route("/:id")
  .get(courseControllers.getByIdCourse)
  .put(
    body("name")
      .notEmpty()
      .withMessage("Kursning nomi bo'sh bo'lishi mumkin emas")
      .isLength({ min: 4 })
      .withMessage("Kurs nomi eng kamida 4 ta belgidan iborat bo'lishi kerak"),
    courseControllers.updateCourse
  )
  .delete(courseControllers.deleteCourse);

module.exports = router;
