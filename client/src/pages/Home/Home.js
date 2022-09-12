import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import styles from "./Home.module.css";

function Home() {
  return (
    <div>
      <Layout title="Home">
        <div className={styles.linksContainer}>
          <Link to="/students?page=1&size=3" className={styles.links}>
            Students
          </Link>
          <Link to="/admin" className={styles.links}>
            I'm Admin
          </Link>
          <Link to="/courses?page=1&size=3" className={styles.links}>
            Courses
          </Link>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
