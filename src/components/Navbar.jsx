import React from 'react'
import {assets} from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center border-[#adadad] border-b border-e-0  border-t-0 border-l-0 pb-2'>
      <div className='logo'>
        <img className='w-[70px]' src={assets.logo} alt="" />
      </div>
      <ul className='flex justify-between gap-3 items-center'>
        <NavLink><li>Home</li></NavLink>
        <NavLink><li>All Doctors</li></NavLink>
        <NavLink><li>About</li></NavLink>
        <NavLink><li>Contact</li></NavLink>
        <NavLink className='ms-4 text-[11px] font-medium border rounded-full py-2 px-'><li>Admin Panel</li></NavLink>
      </ul>
      <button className='bg-[#5F6FFF] text-white px-8 py-3 text-xs rounded-full'><Link to='/'>Create Account</Link></button>
    </div>
  )
}

export default Navbar