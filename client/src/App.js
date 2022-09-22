import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import Students from "./pages/Student/Students";
import Courses from "./pages/Courses/Courses";
import CourseAddEdit from "./pages/CoursesAddEdit/CourseAddEdit";
import StudentsAddEdit from "./pages/StudentAddEdit/StudentsAddEdit";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register/Register";
import Verify from "./pages/Verify/Verify";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import Admin from "./pages/Admin/Admin";

function App() {
  const { isAuth } = useSelector((st) => st.app);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/:id" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isAuth && <Route path="/students" element={<Students />} />}
        {/* {token && <Route path="/user" element={<Admin />} />} */}
        {isAuth && <Route path="/student/:id" element={<StudentsAddEdit />} />}
        {isAuth && <Route path="/courses" element={<Courses />} />}
        {isAuth && <Route path="/course/:id" element={<CourseAddEdit />} />}
        {isAuth && <Route path="/course/:id/students" element={<Students />} />}
        {isAuth && <Route path="*" element={<Navigate to={"/home"} />} />}
        <Route path="*" element={<Navigate to={"/choose"} />} />
      </Routes>
    </>
  );
}

export default App;
