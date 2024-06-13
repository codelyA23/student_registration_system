import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import ListUsers from "./pages/ListUsers";
import UserEdit from "./pages/UserEdit";
import UserAdd from "./pages/UserAdd";
import UpdateResetPassword from "./components/UpdateResetPassword";
import Password from "./pages/Password";


// student
import Courses from "./pages/course/Courses";
import EditCourses from "./pages/course/EditCourses";
import CreateCourses from "./pages/course/CreateCourses";
import FacultyLists from "./pages/faculty/FacultyLists";
import AddFaculty from "./pages/faculty/AddFaculty";
import EditFacultys from "./pages/faculty/EditFacultys";
import ModuleLists from "./pages/module/ModuleLists";
import CreateModules from "./pages/module/CreateModules";
import EditModules from "./pages/module/EditModules";
import ScheduleLists from "./pages/schedule/ScheduleLists";
import CreateSchedules from "./pages/schedule/CreateSchedules";
import EditSchedules from "./pages/schedule/EditSchedules";
import StaffLists from "./pages/staff/StaffLists";
import CreateStaffs from "./pages/staff/CreateStaffs";
import EditStaffs from "./pages/staff/EditStaffs";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/password" element={<Password />} />
          <Route
            path="/updatePassword/:token"
            element={<UpdateResetPassword />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listUsers" element={<ListUsers />} />
          <Route path="/listUsers/add" element={<UserAdd />} />
          <Route path="/listUsers/edit/:user_id" element={<UserEdit />} />

        {/* student route */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/add" element={<CreateCourses />} />
        <Route path="/courses/edit/:course_id" element={<EditCourses />} />
        <Route path="/facultyLists" element={<FacultyLists />} />
        <Route path="/facultyLists/add" element={<AddFaculty />} />
        <Route path="/facultyLists/edit/:faculty_id" element={<EditFacultys />} />
        <Route path="/moduleLists" element={<ModuleLists />} />
        <Route path="/moduleLists/add" element={<CreateModules />} />
        <Route path="/moduleLists/:module_id" element={<EditModules />} />
        <Route path="/scheduleLists" element={<ScheduleLists />} />
        <Route path="/scheduleLists/add" element={<CreateSchedules />} />
        <Route path="/scheduleLists/edit:schedule_id" element={<EditSchedules />} />
        <Route path="/staffLists" element={<StaffLists />} />
        <Route path="/staffLists/add" element={<CreateStaffs />} />
        <Route path="/staffLists/edit/:staff_id" element={<EditStaffs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
