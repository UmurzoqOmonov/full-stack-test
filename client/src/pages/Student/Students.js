import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Table from "../../components/Table/Table";
import { Link, useSearchParams } from "react-router-dom";
import { deleteStudent, getStudents } from "../api/studentsApi";
import useHttp from "../../hooks/use-http";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination/Pagination";

function Students() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 3;
  const { send, loading, error, data, pagination } = useHttp(getStudents);
  const { send: deleteStudents } = useHttp(deleteStudent);
  useEffect(() => {
    send({ page, size });
  }, [page]);

  const deleteHandler = async (id) => {
    await deleteStudents(id);

    send({ page, size });
  };

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
                to={`/students/${student.id}`}
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

  return (
    <div>
      <Layout title="Students">
        {loading && <Loader wait={loading} />}
        {!loading && error && toast.error(error.message)}
        {!error && !loading && data && (
          <Table dataTable={table} addUrl="student" page={pagination} />
        )}
      </Layout>
    </div>
  );
}

export default Students;
