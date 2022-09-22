import http from "../../utils/axios-instance";

export const getUsers = async (reqData) => {
  const res = await http("/auth", {
    params: { page: reqData.page, size: reqData.size },
  });

  return {
    content: res.data.data.content,
    pagination: res.data.data.pagination,
  };
};

export const deleteUsers = async (id) => {
  const res = await http.de(`/auth/users/${id}`);
  return res.data;
};

export const registerSubmit = async ({ data, isUpdate, id }) => {
  const res = await http({
    url: isUpdate
      ? `http://localhost:2000/api/v1/auth/users/${id}`
      : "http://localhost:2000/api/v1/auth/register",
    method: isUpdate ? "PUT" : "POST",
    data,
  });

  return res;
};
