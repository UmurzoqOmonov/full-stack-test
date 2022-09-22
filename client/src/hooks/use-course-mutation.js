import useHttp from "./use-http";
import { submit } from "../pages/api/coursesApi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../utils/axios-instance";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Kursning nomi eng kamida 3 ta belgidan iborat bo'lishi kerak")
    .max(30)
    .required("Kursning nomi bo'sh bo'lishi mumkin emas"),
});

const useCourseMutation = () => {
  const params = useParams();
  const isUpdate = params.id !== "new";
  const { send } = useHttp(submit);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isUpdate) {
      courseById();
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };
  const onSubmit = async (data) => {
    await send({ data, isUpdate, id: params.id });
    reset();
    goBack();
  };

  const courseById = async () => {
    const res = await axiosInstance(`/courses/${params.id}`);

    reset(res.data.data.byId);
  };

  return { register, errors, handleSubmit, onSubmit, isUpdate };
};

export default useCourseMutation;
