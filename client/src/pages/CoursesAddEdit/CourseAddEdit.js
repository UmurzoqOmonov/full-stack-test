import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import styles from "./CourseAddEdit.module.css";
import useHttp from "../../hooks/use-http";
import { submit } from "../api/coursesApi";

function CourseAddEdit() {
  const params = useParams();
  const isUpdate = params.id !== "new";
  const { send } = useHttp(submit);

  useEffect(() => {
    if (isUpdate) {
      courseById();
    }
  }, []);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await send({ data, isUpdate, id: params.id });
    reset();
    goBack();
  };

  const courseById = async () => {
    const res = await axios(
      `http://localhost:2000/api/v1/courses/${params.id}`
    );
    console.log(res);
    reset(res.data.data.byId);
  };

  return (
    <div>
      <Layout title={isUpdate ? "Update course" : "Add new course"}>
        {/* < to={"/courses/new"}>Add Course</> */}
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className={styles.formLabel} htmlFor="name">
              Course Name
            </label>
            <input
              id="name"
              className={styles.formControl}
              type="text"
              {...register("name", { required: true, maxLength: 20 })}
            />
          </div>
          <div>
            <label className={styles.formLabel} htmlFor="description">
              Course Description
            </label>
            <input
              id="description"
              className={styles.formControl}
              type="text"
              {...register("description", {
                // required: true,
              })}
            />
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

export default CourseAddEdit;
