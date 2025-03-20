import React, { useContext } from 'react'
import {assets} from '../src/assets/assets'
import { useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setAdminToken, backendUrl} = useContext(AdminContext)

  const onSubmitHandler = async(event) =>{
    event.preventDefault()

    try {
      
      if (state === 'Admin') {
        const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password})
        if (data.success) {
          localStorage.setItem('adminToken', data.token)
          setAdminToken(data.token);
        }else{
          toast.error(data.message)
        }
        
      } else {
        
   
      }
    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex flex-col items-center justify-center text-left'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-[#5F6FFF]'>{state}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#dadada] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#dadada] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='w-full bg-[#5F6FFF] text-white py-3 rounded-md text-base cursor-pointer'>Login</button>
        {
          state === "Admin" ? <p>Doctor Login? <span className='text-[#5f6fff] underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
         : <p>Admin Login? <span className='text-[#5f6fff] underline cursor-pointer' onClick={()=>setState("Admin")}>Click here</span></p>
       }
      </div>
      
    </form>
  )
}

export default Login