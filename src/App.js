import { ToastContainer } from "react-toastify"; // For displaying toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast notifications CSS
import "./App.css";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Error403 from "./components/Error403";
import DashBoard from "./components/DashBoard";
import { ProtectRoutes } from "./Hooks/protectRoutes";
import { ProtectAdminRoutes } from "./Hooks/protectAdminRoutes";
import AddUser from "./components/AddUser";
import AddStudent from "./components/AddStudent";
import SearchStudent from "./components/SearchStudent";
import AddFaculty from "./components/AddFaculty";
import GetFaculties from "./components/GetFaculties";
import GetUsers from "./components/GetUsers";
import Student from "./components/Student";
import AdminStudentProfile from "./components/AdminStudentProfile";
import Error404 from "./components/Error404";

function App() {
  return (
    <div className="App">
      <ToastContainer /> {/* ToastContainer for displaying toast notifications */}

      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error-403" element={<Error403 />} />
        <Route path="/student" element={<Student />} />

        {/* Protected routes for authenticated users - users with permissions */}
        <Route element={<ProtectRoutes />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="/search-student" element={<SearchStudent />} />
          <Route path="/admin-student-profile/:id" element={<AdminStudentProfile />} />
          <Route path="/get-faculties" element={<GetFaculties />} />
        </Route>

        {/* Protected routes for admin users */}
        <Route element={<ProtectAdminRoutes />}>
          <Route path="/register" element={<AddUser />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/add-faculty" element={<AddFaculty />} />
          <Route path="/get-users" element={<GetUsers />} />
        </Route>

        {/* Fallback route for undefined paths */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
