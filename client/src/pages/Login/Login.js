import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./Login.module.css";
import { openEye, closeEye } from "../../assets/swg/eyes";
import Layout from "../../components/Layout";
import axiosInstance from "../../utils/axios-instance";
import { useDispatch } from "react-redux";
import { appActions } from "../../store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(5)
    .max(20)
    .required("Foydalanuvchining Logini bo'sh bo'lishi mumkin emas"),
  password: yup
    .string()
    .min(6)
    .max(20)
    .required("Foydalanuvchining paroli bo'sh bo'lishi mumkin emas"),
});

function Login() {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [typeState, setTypeState] = useState(false);

  const typeChangeHandler = () => {
    setTypeState(!typeState);
  };

  const loginHandler = async (data) => {
    try {
      const res = await axiosInstance({
        url: "http://localhost:2000/api/v1/auth/login",
        method: "POST",
        data: data,
      });

      const resData = await res.data.data;
      localStorage.setItem("token", resData.jwt);
      localStorage.setItem("user", JSON.stringify(resData.user));
      dispatch(appActions.login(resData));
      navigate("/home");
    } catch (error) {
      const err = await error.response.data;
      console.log(error);
      toast.error(err.message);
    }
  };

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
