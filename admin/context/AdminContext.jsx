import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { adminToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors[0].available);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  const changeAvailablity = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availablity",
        { docId },
        { headers: { adminToken } }
      );
      if (data.success) {
        toast.success(data.message);
        await getAllDoctors();
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  const getAllAppointments = async() =>{
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/appointments",
        { headers: { adminToken } }
      );
      if (data.success) {
        setAppointments(data.appointments)
        // console.log(data.appointments);
        
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailablity,
    getAllAppointments,
    appointments, setAppointments,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
