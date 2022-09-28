import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { deleteStudent, getStudents } from "../pages/api/studentsApi";
import useHttp from "./use-http";

const useStudents = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 3;
  const search = searchParams.get("search");
  const { send, loading, error, data, pagination } = useHttp(getStudents);
  const { send: deleteStudents } = useHttp(deleteStudent);

  const deleteHandler = async (id) => {
    await deleteStudents(id);
    send({ page, size, courseId });
  };

  const [value, setValue] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(
        `/students?page=${page}&size=${size}&search=${
          value === null ? "" : value
        }`
      );
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  useEffect(() => {
    send({ page, size, courseId, search });
  }, [page, search]);

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

  return { send, pagination, error, loading, table, data, setValue };
};

export default useStudents;
