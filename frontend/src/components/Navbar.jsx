import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [navDisplay, setNavDisplay] = useState(false);
  const navigate = useNavigate();
  // const {token, setToken} = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false);

  const logout = () =>{
    setToken(false)
    localStorage.removeItem('token')
  }
  return (
    <div className="flex justify-between items-center border-[#adadad] border-b border-e-0  border-t-0 border-l-0 pb-2 relative">
      <div className="logo">
        <Link to="/">
          <img className="w-[70px]" src={assets.logo} alt="" />
        </Link>
      </div>
      <ul className="flex justify-between gap-3 items-center max-[960px]:hidden">
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/doctors">
          <li>All Doctors</li>
        </NavLink>
        <NavLink to="/about">
          <li>About</li>
        </NavLink>
        <NavLink to="/contact">
          <li>Contact</li>
        </NavLink>
        <NavLink className="ms-4 text-[11px] font-medium border rounded-full py-2 px-2">
          <li>Admin Panel</li>
        </NavLink>
      </ul>
      <div>
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5 " src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={()=>navigate('/myprofile')} className="hover:text-black cursor-pointer">My profile</p>
                <p onClick={()=>navigate('/myappoinments')} className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={logout} className="hover:text-black cursor-pointer">Log out</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#5F6FFF] text-white px-8 py-3 text-xs rounded-full"
          >
            <Link to="/">Create Account</Link>
          </button>
        )}
      </div>

      <button
        className="hidden max-[960px]:block"
        onClick={() => setNavDisplay(!navDisplay)}
      >
        {navDisplay ? (
          <i class="fa-solid fa-xmark" />
        ) : (
          <i class="fa-solid fa-bars" />
        )}
      </button>
      {navDisplay ? (
        <div>
          <ul className="flex-col gap-3 items-center absolute left-0 top-[100%] bg-[#fff] border w-[100%]">
            <NavLink to="/">
              <li>Home</li>
            </NavLink>
            <NavLink to="/doctors">
              <li>All Doctors</li>
            </NavLink>
            <NavLink to="/about">
              <li>About</li>
            </NavLink>
            <NavLink to="/contact">
              <li>Contact</li>
            </NavLink>
            <NavLink className="">
              <li>Admin Panel</li>
            </NavLink>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
