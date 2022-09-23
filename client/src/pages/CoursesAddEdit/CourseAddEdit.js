import React from "react";
import Layout from "../../components/Layout";
import styles from "./CourseAddEdit.module.css";
import useCourseMutation from "../../hooks/use-course-mutation";
function CourseAddEdit() {
  const { register, handleSubmit, onSubmit, isUpdate } = useCourseMutation();
  return (
    <div>
      <Layout title={isUpdate ? "Update course" : "Add new course"}>
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
