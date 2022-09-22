import React from "react";
import Layout from "../../components/Layout";
import styles from "./Student.module.css";
import useStudentMutation from "../../hooks/use-student-mutation";
import { useParams } from "react-router-dom";

function StudentsAddEdit() {
  const params = useParams();
  const isUpdate = params.id !== "new";

  const { onSubmit, courses, handleSubmit, errors, register, reset, student } =
    useStudentMutation({ isUpdate, id: params.id });
  // if (isUpdate) reset(student);
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
              {courses &&
                courses.map((c) => (
                  <option
                    className={styles.formControl}
                    key={c.id}
                    value={c.id}
                  >
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
