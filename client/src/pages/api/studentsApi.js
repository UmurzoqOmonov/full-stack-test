import http from "../../utils/axios-instance";

export const getStudents = async (reqData) => {
  if (!reqData.courseId) {
    const res = await http("/students", {
      params: { page: reqData.page, size: reqData.size },
    });
    return {
      content: res.data.data.content,
      pagination: res.data.data.pagination,
    };
  } else {
    const res = await http(`/students/${reqData.courseId}`);
    return {
      content: res.data.data.content,
      pagination: res.data.data.pagination,
    };
  }
};

export const deleteStudent = async (id) => {
  const res = await http.delete(`/students/${id}`);
  return res.data;
};

export const studentSubmit = async ({ data, isUpdate, id }) => {
  const res = await http({
    url: isUpdate
      ? `http://localhost:2000/api/v1/students/${id}`
      : "http://localhost:2000/api/v1/students",
    method: isUpdate ? "PUT" : "POST",
    data: data,
  });
  return res.data;
};
