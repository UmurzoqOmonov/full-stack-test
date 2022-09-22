import useHttp from "./use-http";
import { getCourses, deleteCourse } from "../pages/api/coursesApi";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const useCourses = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 3;
  const { send: deletedCourse } = useHttp(deleteCourse);
  const { send, error, loading, data, pagination } = useHttp(getCourses);
  const deletedHandler = async (id) => {
    await deletedCourse(id);
    send({ page, size });
  };

  useEffect(() => {
    send({ page, size });
  }, [page]);

  const table = {
    cools: [
      { header: "ID", acc: "id" },
      {
        header: "Nomi",
        acc: (item, style) => (
          <Link className={style.linkName} to={`/students?courseId=${item.id}`}>
            {item.name}
          </Link>
        ),
      },
      { header: "Izohi", acc: "description" },
      {
        header: "Actions",
        acc: (course, style) => {
          return (
            <div className={style.optionsContainer}>
              <Link className={style.updateCourse} to={`/course/${course.id}`}>
                Update
              </Link>
              <button onClick={deletedHandler.bind(null, course.id)}>
                delete
              </button>
            </div>
          );
        },
      },
    ],
    data: data,
  };

  return { table, loading, error, send, pagination, data };
};

export default useCourses;
