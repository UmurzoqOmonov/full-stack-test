import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { deleteStudent, getStudents } from "../pages/api/studentsApi";
import useHttp from "./use-http";

const useStudents = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 3;
  const { send, loading, error, data, pagination } = useHttp(getStudents);
  const { send: deleteStudents } = useHttp(deleteStudent);

  const deleteHandler = async (id) => {
    await deleteStudents(id);
    send({ page, size, courseId });
  };

  useEffect(() => {
    send({ page, size, courseId });
  }, [page]);

  const table = {
    cools: [
      { header: "ID", acc: "id" },
      { header: "Ismi", acc: "firstName" },
      { header: "Familiyasi", acc: "lastName" },
      { header: "Tug'ilgan Sanasi", acc: "birthYear" },
      {
        header: "Actions",
        acc: (student, style) => {
          return (
            <div className={style.optionsContainer}>
              <Link
                to={`/student/${student.id}`}
                className={style.updateCourse}
              >
                Update
              </Link>
              <button onClick={deleteHandler.bind(null, student.id)}>
                delete
              </button>
            </div>
          );
        },
      },
    ],
    data: data,
  };

  return { send, pagination, error, loading, table, data };
};

export default useStudents;
