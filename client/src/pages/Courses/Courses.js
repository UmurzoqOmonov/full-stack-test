import Layout from "../../components/Layout";
import Table from "../../components/Table/Table";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./Course.module.css";
import useHttp from "../../hooks/use-http";
import { getCourses, deleteCourse } from "../api/coursesApi";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination/Pagination";

function Courses() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 3;
  const { send: deletedCourse } = useHttp(deleteCourse);
  const { send, error, loading, data, pagination } = useHttp(getCourses);
  const deletedHandler = async (id) => {
    await deletedCourse(id);
    send({ page, size });
  };

  let [color, setColor] = useState("blue");
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

  return (
    <div>
      <Layout title="Courses">
        {loading && <Loader wait={loading} />}
        {!loading && error && toast.error(error.message)}
        {!error && !loading && data && (
          <Table dataTable={table} addUrl="course" page={pagination} />
        )}
      </Layout>
    </div>
  );
}

export default Courses;
