import { createContext, useState } from 'react';
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken')? localStorage.getItem('adminToken') : "")
    const [doctors, setDoctors] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async() =>{
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers : {adminToken}})
            if (data.success) {
                setDoctors(data.doctors)
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
            
        }
    }

    const value = {
        adminToken, setAdminToken,
        backendUrl, doctors,
        getAllDoctors
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider