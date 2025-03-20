import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {
  const {doctors, adminToken, getAllDoctors} = useContext(AdminContext)
  useEffect(()=>{
    if(adminToken){
      getAllDoctors()
    }
  },[adminToken])
  // console.log(doctors);
  
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item, index)=>(
            <div key={index}>
              <img src={item.image} alt="" />
              <div>
                <p>{item.name}</p>
                <p>{item.speciality}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorList