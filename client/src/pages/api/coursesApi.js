import http from "../../utils/axios-instance";

export const getCourses = async (reqData) => {
  const res = await http("/courses", {
    params: { page: reqData.page, size: reqData.size },
  });

  return {
    content: res.data.data.content,
    pagination: res.data.data.pagination,
  };
};

export const deleteCourse = async (id) => {
  const res = await http.delete(`/courses/${id}`);
  return res.data;
};

export const submit = async ({ data, isUpdate, id }) => {
  const res = await http({
    url: isUpdate
      ? `http://localhost:2000/api/v1/courses/${id}`
      : "http://localhost:2000/api/v1/courses",
    method: isUpdate ? "PUT" : "POST",
    data: data,
  });
  return res.data;
};
