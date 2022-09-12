import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import styles from "./Register.module.css";
import axios from "axios";
import useHttp from "../../hooks/use-http";
import { submit } from "../api/registerApi.js";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .max(20)
    .min(3)
    .required("Foydalanuvchining ismi bo'sh bo'lishi mumkin emas"),
  lastName: yup
    .string()
    .min(5)
    .max(30)
    .required("Foydalanuvchining familiyasi bo'sh bo'lishi mumkin emas"),
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
  email: yup
    .string()
    .email()
    .min(10)
    .max(50)
    .required("Foydalanuvchining E-mail manzili bo'sh bo'lishi mumkin emas"),
  phoneNumber: yup
    .string()
    .min(13)
    .max(14)
    .required("Foydalanuvchining telefon raqami bo'sh bo'lishi mumkin emas"),
});

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { send } = useHttp(submit);
  const params = useParams();
  const isUpdate = params.id !== "new";
  const navigate = useNavigate();
  useEffect(() => {
    if (isUpdate) {
      getUser(params.id);
    }
  }, []);

  const getUser = async (id) => {
    const users = await axios(`http://localhost:2000/api/v1/auth/users/${id}`);
    reset(res.data.data.byId);
  };
  const goBack = () => {
    navigate(-1);
  };

  const postRegister = async (data) => {
    await send({ data, isUpdate, id: params.id });
    goBack();
  };

  return (
    <div>
      <Layout title="Register">
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(postRegister)}
        >
          <div className={styles.formControl}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Firstname"
              {...register("firstName")}
            />
            <p>{errors.firstName?.message}</p>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Lastname"
              {...register("lastName")}
            />
            <p>{errors.lastName?.message}</p>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              {...register("username")}
            />
            <p>{errors.username?.message}</p>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Password"
              {...register("password")}
            />
            <p>{errors.password?.message}</p>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              {...register("email")}
            />
            <p>{errors.email?.message}</p>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              {...register("phoneNumber")}
            />
            <p>{errors.phoneNumber?.message}</p>
          </div>
          <button className={styles.btn}>Register</button>
        </form>
      </Layout>
    </div>
  );
}

export default Register;
