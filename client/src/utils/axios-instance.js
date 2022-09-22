import axios from "axios";
const token = localStorage.getItem("token");

export default axios.create({
  baseURL: "http://localhost:2000/api/v1",
  headers: { Authorization: `Bearer ${token}` },
});
