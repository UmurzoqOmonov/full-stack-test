import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import styles from "./Student.module.css";
import axios from "axios";
import useHttp from "../../hooks/use-http";
import { submit } from "../api/studentsApi";

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

function StudentsAddEdit() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [courses, setCourses] = useState([]);
  const { send } = useHttp(submit);
  const params = useParams();
  const isUpdate = params.id !== "new";

  useEffect(() => {
    getCourses();
    if (isUpdate) {
      studentById();
    }
  }, []);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = async (data) => {
    await send({ data, isUpdate, id: params.id });
    goBack();
  };

  const studentById = async () => {
    const res = await axios(
      `http://localhost:2000/api/v1/students/${params.id}`
    );
    reset(res.data.data.byId);
  };

  const getCourses = async () => {
    const courses = await axios("http://localhost:2000/api/v1/courses");
    setCourses(courses.data.data.content);
  };

  return (
    <div>
      <Layout title={isUpdate ? "Update student" : "Add new stydent"}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className={styles.formLabel} htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              className={styles.formControl}
              type="text"
              placeholder="Firstname"
              name="firstName"
              {...register("firstName")}
            />
            <p>{errors.firstName?.message}</p>
          </div>
          <div>
            <label className={styles.formLabel} htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              placeholder="Lastname"
              className={styles.formControl}
              type="text"
              name="lastName"
              {...register("lastName")}
            />
            <p>{errors.lastName?.message}</p>
          </div>
          <div>
            <label className={styles.formLabel} htmlFor="birthYear">
              Birth Date
            </label>
            <input
              id="birthYear"
              className={styles.formControl}
              type="date"
              name="birthYear"
              {...register("birthYear")}
            />
            <p>{errors.birthYear?.message}</p>
          </div>
          <div>
            <label className={styles.formLabel}>Course</label>
            <select
              className={styles.formControl}
              name="courseId"
              {...register("courseId")}
            >
              <option>Courses</option>
              {courses.map((c) => (
                <option className={styles.formControl} key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <p>{errors.courseId?.message}</p>
          </div>
          <div>
            <button className={`${styles.formControl} ${styles.btn}`}>
              Save
            </button>
          </div>
        </form>
      </Layout>
    </div>
  );
}

export default StudentsAddEdit;
