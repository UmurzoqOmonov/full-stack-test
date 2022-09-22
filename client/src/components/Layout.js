import React from "react";
import { Link, useNavigate } from "react-router-dom";
import homeLogo from "../assets/images/course-logo.png";
import styles from "./Layout.module.css";

function Layout(props) {
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.clear();
    navigate("/choose");
  };

  return (
    <>
      <div className={styles.navbar}>
        <Link to="/" className={styles.homeLogo}>
          <img src={homeLogo} alt="Course Logo" />
        </Link>

        <div>
          <h2 className={styles.title}>{props.title}</h2>
          <button onClick={logOutHandler} className={styles.logOut}>
            Log Out
          </button>
        </div>
      </div>
      {props.children}
    </>
  );
}

export default Layout;
