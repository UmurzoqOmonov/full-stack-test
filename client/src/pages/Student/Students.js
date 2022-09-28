import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Table from "../../components/Table/Table";

import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import useStudents from "../../hooks/use-students";

function Students() {
  const { send, error, loading, data, pagination, table, setValue } =
    useStudents();
  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <Layout title="Students">
        <input placeholder="search" onChange={changeHandler} type="text" />
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
