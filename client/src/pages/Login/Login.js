import React from "react";
import styles from "./Login.module.css";
import { openEye, closeEye } from "../../assets/swg/eyes";
import Layout from "../../components/Layout";
import useLogin from "../../hooks/use-login";

function Login() {
  const { register, handleSubmit, loginHandler, typeChangeHandler, typeState } =
    useLogin();
  return (
    <Layout title="Login">
      <form className={styles.loginForm} onSubmit={handleSubmit(loginHandler)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className={styles.password}>
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            id="password"
            type={typeState ? "text" : "password"}
            placeholder="Password"
          />
          <div className={styles.changeType}>
            <div onClick={typeChangeHandler}>
              {typeState ? openEye : closeEye}
            </div>
          </div>
        </div>

        <button>Log In</button>
      </form>
    </Layout>
  );
}

export default Login;
