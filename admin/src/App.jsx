import React, { useContext } from "react";
import Login from "../pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import {Routes, Route} from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import AllAPointments from '../pages/admin/AllApointment'
import AddDoctor from '../pages/admin/AddDoctor'
import DoctorList from '../pages/admin/DoctorList'

const App = () => {
  const { adminToken } = useContext(AdminContext);
  return adminToken ? (
    <div className="bg-[#f8f9fd]">
      <ToastContainer />
      <NavBar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>}/>
          <Route path="/admin-dashboard" element={<Dashboard />}/>
          <Route path="/all-appointments" element={<AllAPointments />}/>
          <Route path="/doctor-list" element={<DoctorList />}/>
          <Route path="/add-doctor" element={<AddDoctor />}/>
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
