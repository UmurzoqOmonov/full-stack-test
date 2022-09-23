import React, { useState } from "react";
import axiosInstance from "../utils/axios-instance";
import { useDispatch } from "react-redux";
import { appActions } from "../store/index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
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

const useLogin = () => {
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

      toast.error(err.message);
    }
  };

  return { register, loginHandler, typeChangeHandler, handleSubmit, typeState };
};

export default useLogin;
