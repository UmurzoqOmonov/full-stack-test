import "./App.css";
import Layout from "./components/Layout";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import Students from "./pages/Student/Students";
import Courses from "./pages/Courses/Courses";
import CourseAddEdit from "./pages/CoursesAddEdit/CourseAddEdit";
import StudentsAddEdit from "./pages/StudentAddEdit/StudentsAddEdit";
import "react-toastify/dist/ReactToastify.css";
import ReactTable from "./components/React-table/React-table";
import Register from "./pages/register/Register";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Register />} />
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/" element={<ReactTable />} /> */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/verify/:id" element={<Courses />} />
        <Route path="/course/:id" element={<CourseAddEdit />} />
        <Route path="/course/:id/students" element={<Students />} />
        <Route path="/students" element={<Students />} />
        {/* <Route path="/student/new" element={<StudentsAddEdit />} /> */}
        <Route path="/student/:id" element={<StudentsAddEdit />} />
      </Routes>
    </>
  );
}

export default App;
