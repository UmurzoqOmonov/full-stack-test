import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios-instance";

const useRegister = () => {
  const navigate = useNavigate();

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

  return { postRegister };
};

export default useRegister;
