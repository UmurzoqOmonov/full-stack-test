import Layout from "../../components/Layout";
import Table from "../../components/Table/Table";
import { toast } from "react-toastify";
import styles from "./Course.module.css";
import useCourses from "../../hooks/use-courses";
import Loader from "../../components/Loader";

function Courses() {
  const { send, loading, error, pagination, table, data } = useCourses();

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
