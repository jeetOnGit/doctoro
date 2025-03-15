import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-between py-10   max-[800px]:items-center max-[800px]:gap-5 max-[800px]:w-fit max-[800px]:flex-wrap">
      <div className="w-[40%] max-[800px]:w-fit">
        <img className="w-[60px]" src={assets.logo} alt="" />
        <p className="text-xs text-[#5c5c5c]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.{" "}
        </p>
      </div>
      <div className="text-[#5c5c5c] ">
        <ul>
          <li className="text-black font-medium">COMPANY</li>
          <li className="text-sm">
            <Link to="/">Home</Link>
          </li>
          <li className="text-sm">
            <Link to="/about">About us</Link>
          </li>
          <li className="text-sm">
            <Link to="/">Delivery</Link>
          </li>
          <li className="text-sm">
            <Link to="/">Privacy policy</Link>
          </li>
        </ul>
      </div>
      <div className="text-[#5c5c5c]">
        <ul>
          <li className="text-black font-medium">GET IN TOUCH</li>
          <li className="text-sm">
            +0-000-000-000
          </li>
          <li className="text-sm">
            demoJeet@gmail.com
          </li>
  
        </ul>
      </div>
    </div>
  );
};

export default Footer;
