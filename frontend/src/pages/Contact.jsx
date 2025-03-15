import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <section className="aboutUs py-10">
        <div className="sectionHeading mx-auto text-center w-[50%]">
          <h3 className="text-[1.6rem] font-medium text-[#5c5c5c] leading-normal">
            CONTACT <span className="text-[#374151]">US</span>
          </h3>
        </div>

        <div className="flex gap-10 justify-center py-8 max-[590px]:flex-col">
          <div className="w-[30%]">
            <img src={assets.contact_image} alt="" />
          </div>
          <div className="text-xs w-[30%] flex flex-col gap-6 justify-center text-[#5c5c5c]">
            <p className="text-[1.4rem]">OUR OFFICE</p>
            <p>
              00000 Willms Station Suite 000, <br /> Washington, USA
            </p>

            <p className="text-black font-semibold">
              Tel: (000) 000-0000
              <br />
              Email: demoJeet@gmail.com
            </p>

            <p className="text-[1.4rem] leading-normal">CAREERS AT DOCTORO</p>
            <p>Learn more about our teams and job openings.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
