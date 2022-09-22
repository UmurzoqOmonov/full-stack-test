import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import useHttp from "../../hooks/use-http";
import { submit } from "../api/registerApi";
import RegisterForms from "../../components/RegisterForm/RegisterForms";
import axiosInstance from "../../utils/axios-instance";

function Register() {
  // const { send, data: resData } = useHttp(submit);

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(resData);
  // }, [resData]);

  const goBack = (id) => {
    navigate(`/verify/${id}`);
  };

  const postRegister = async (data) => {
    const res = await axiosInstance.post(
      "http://localhost:2000/api/v1/auth/register",
      data
    );
    const id = res.data.data.createdNewAdmin.id;

    goBack(id);
  };

  return (
    <div>
      <Layout title="Register">
        <RegisterForms postRegister={postRegister} />
      </Layout>
    </div>
  );
}

export default Register;
