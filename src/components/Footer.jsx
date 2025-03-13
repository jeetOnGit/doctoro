import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="w-[40%]">
        <img className="w-[70px]" src={assets.logo} alt="" />
        <p className="text-xs">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.{" "}
        </p>
      </div>
      <div>
        <ul>
          <li>COMPANY</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/">Delivery</Link>
          </li>
          <li>
            <Link to="/">Privacy policy</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>GET IN TOUCH</li>
          <li>
            +0-000-000-000
          </li>
          <li>
            greatstackdev@gmail.com
          </li>
  
        </ul>
      </div>
    </div>
  );
};

export default Footer;
