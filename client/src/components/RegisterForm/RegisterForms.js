import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { openEye, closeEye } from "../../assets/swg/eyes";

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
    .min(12)
    .max(14)
    .required("Foydalanuvchining telefon raqami bo'sh bo'lishi mumkin emas"),
});

function RegisterForms(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [typeState, setTypeState] = useState(false);

  const typeChangeHandler = () => {
    setTypeState(!typeState);
  };

  const handleData = (data) => {
    props.postRegister(data);
  };

  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit(handleData)}>
        <div>
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
        <div>
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
        <div>
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
          <p>{errors.password?.message}</p>
        </div>

        <div>
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
        <div>
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
        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterForms;
