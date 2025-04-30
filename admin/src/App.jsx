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
import { DoctorContext } from "../context/DoctorContext";
import DoctorAppointment from "../pages/doctor/doctorAppointment";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorProfile from "../pages/doctor/DoctorProfile";
const App = () => {
  const { adminToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return adminToken || dToken ? (
    <div className="bg-[#f8f9fd]">
      <ToastContainer />
      <NavBar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>}/>
          <Route path="/admin-dashboard" element={<Dashboard />}/>
          <Route path="/all-appointments" element={<AllAPointments />}/>
          <Route path="/doctor-list" element={<DoctorList />}/>
          <Route path="/add-doctor" element={<AddDoctor />}/>

          {/* Doctor Routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />}/>
          <Route path="/doctor-profile" element={<DoctorProfile />}/>
          <Route path="/doctor-appointments" element={<DoctorAppointment />}/>


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
