import React from "react";
import styles from "./Admin.module.css";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

function Admin() {
  const { user } = useSelector((st) => st.app);
  console.log(user);

  return (
    <div>
      <Layout title={""}></Layout>
    </div>
  );
}

export default Admin;
