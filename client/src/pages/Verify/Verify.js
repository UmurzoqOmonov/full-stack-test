import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import http from "../../utils/axios-instance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Verify.module.css";

const schema = yup.object().shape({
  verificationCode: yup
    .string()
    .min(4, "Verification code noto'g'ri kiritildi")
    .max(4, "Verification code not'g'ri kiritildi")
    .required("Verification code bo'sh bo'lishi mumkin emas!"),
});

function Verify() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const { id } = useParams();
  const navigate = useNavigate();

  const dataHandler = async (data) => {
    const response = await http.post(
      `http://localhost:2000/api/v1/auth/verify/${id}`,
      data
    );

    if (response.status === 200) {
      toast(response.data.message);
      navigate("/login");
    } else if (response.status === 400) {
      toast(response.data.message);
      navigate("/login");
    } else if (response.status === 404) {
      toast(response.data.message);
      navigate("/register");
    }
  };

  return (
    <Layout title="Verification Code">
      <form className={styles.loginForm} onSubmit={handleSubmit(dataHandler)}>
        <div>
          <label htmlFor="verifyCode">Verification Code</label>
          <input
            type="text"
            name="verificationCode"
            id="verifyCode"
            {...register("verificationCode")}
          />
        </div>

        <button>Put Verify Code</button>
      </form>
    </Layout>
  );
}

export default Verify;
