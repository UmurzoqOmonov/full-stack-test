import React from "react";

import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

function Admin() {
  const { user } = useSelector((st) => st.app);

  return (
    <div>
      <Layout title={`${user.firstName}`}></Layout>
    </div>
  );
}

export default Admin;
