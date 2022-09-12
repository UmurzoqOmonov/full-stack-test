import React from "react";
import { Link } from "react-router-dom";
import homeLogo from "../assets/images/course-logo.png";
import styles from "./Layout.module.css";

function Layout(props) {
  return (
    <>
      <div className={styles.navbar}>
        <Link to="/" className={styles.homeLogo}>
          <img src={homeLogo} alt="Course Logo" />
        </Link>
        <div>
          <h2 className={styles.title}>{props.title}</h2>
        </div>
      </div>
      {props.children}
    </>
  );
}

export default Layout;
