import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import styles from "./Home.module.css";

function Home() {
  const { isAuth } = useSelector((st) => st.app);
  const params = useParams();
  const hasHome = params.id === "home";

  return (
    <div>
      <Layout title="Home">
        <div className={styles.linksContainer}>
          <Link
            to={hasHome ? "/courses" : "/register"}
            className={styles.links}
          >
            {hasHome ? "Courses" : "Register"}
          </Link>
          <Link to={hasHome ? "/user" : "/admin"} className={styles.links}>
            {hasHome ? "Users" : "I'm Admin"}
          </Link>
          <Link to={hasHome ? "/students" : "/login"} className={styles.links}>
            {hasHome ? "Students" : "Login"}
          </Link>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
