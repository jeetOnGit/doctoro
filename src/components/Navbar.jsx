import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  const [navDisplay, setNavDisplay] = useState(false)

  return (
    <div className='flex justify-between items-center border-[#adadad] border-b border-e-0  border-t-0 border-l-0 pb-2 relative'>
      <div className='logo'>
        <Link to='/'><img className='w-[70px]' src={assets.logo} alt="" /></Link>
      </div>
      <ul className='flex justify-between gap-3 items-center max-[960px]:hidden'>
        <NavLink to='/'><li>Home</li></NavLink>
        <NavLink to='/doctors'><li>All Doctors</li></NavLink>
        <NavLink to='/about'><li>About</li></NavLink>
        <NavLink to='/contact'><li>Contact</li></NavLink>
        <NavLink className='ms-4 text-[11px] font-medium border rounded-full py-2 px-2'><li>Admin Panel</li></NavLink>
      </ul>
      <button className='bg-[#5F6FFF] text-white px-8 py-3 text-xs rounded-full'><Link to='/'>Create Account</Link></button>

      <button className='hidden max-[960px]:block' onClick={()=> setNavDisplay(!navDisplay)}>{navDisplay ? <i class="fa-solid fa-xmark" /> : <i class="fa-solid fa-bars" /> }</button>
      {
        navDisplay ? 
        <div>
         <ul className='flex-col gap-3 items-center absolute left-0 top-[100%] bg-[#fff] border w-[100%]'>
           <NavLink to='/'><li>Home</li></NavLink>
           <NavLink to='/doctors'><li>All Doctors</li></NavLink>
           <NavLink to='/about'><li>About</li></NavLink>
           <NavLink to='/contact'><li>Contact</li></NavLink>
           <NavLink className=''><li>Admin Panel</li></NavLink>
           </ul>
       </div>
       : ""
      }
    </div>
  )
}

export default Navbar