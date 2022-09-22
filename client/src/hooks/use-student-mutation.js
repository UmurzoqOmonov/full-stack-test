import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "./use-http";
import { studentSubmit } from "../pages/api/studentsApi";
import * as yup from "yup";
import axiosInstance from "../utils/axios-instance";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(3)
    .max(20)
    .required("Talabaning ismi bo'sh bo'lishi mumkin emas"),
  lastName: yup
    .string()
    .min(5)
    .max(25)
    .required("Talabaning familiyasi bo'sh bo'lishi mumkin emas"),
  birthYear: yup
    .string()
    .min(10)
    .max(10)
    .required("Talabaning tug'ilgan sanasi bo'sh bo'lishi mumkin emas"),
  courseId: yup
    .number()
    .positive()
    .integer()
    .required(
      "Talabaning qaysi kursda ta'lim olishi bo'sh bo'lishi mumkin emas"
    ),
  // password: yup.string().min(4).max(20).required(),
  // confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

const useStudentMutation = ({ isUpdate, id }) => {
  const { send } = useHttp(studentSubmit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();

    if (isUpdate) {
      const getStudent = async () => {
        const student = await studentById(id);
        reset(student);
      };
      getStudent();
    }
  }, []);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = async (data) => {
    await send({ data, isUpdate, id });
    goBack();
  };

  const studentById = async (id) => {
    const res = await axiosInstance(`/students/${id}`);
    return res.data.data.byId;
  };

  const getCourses = async () => {
    const courses = await axiosInstance("/courses");
    setCourses(courses.data.data.content);
  };

  return {
    onSubmit,
    register,
    errors,
    handleSubmit,
    reset,
    courses,
  };
};

export default useStudentMutation;
