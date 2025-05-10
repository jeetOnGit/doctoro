import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <section className="aboutUs py-10">
        <div className="sectionHeading mx-auto text-center w-[50%]">
          <h3 className="text-[1.6rem] font-medium text-[#5c5c5c]">
            ABOUT <span className="text-[#374151]">US</span>
          </h3>
        </div>

        <div className="flex gap-10 max-[665px]:flex-col max-[665px]:mt-5">
          <div className="w-[30%] max-[665px]:w-fit">
            <img src={assets.about_image} alt="" />
          </div>
          <div className="text-xs w-[60%] flex flex-col gap-6 justify-center text-[#5c5c5c] max-[665px]:w-fit">
            <p>
              Welcome to Prescripto, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At Prescripto, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </p>

            <p>
              Prescripto is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you're booking your first appointment or
              managing ongoing care, Prescripto is here to support you every
              step of the way.
            </p>

            <p className="text-black font-semibold">Our Vision</p>

            <p>
              Our vision at Prescripto is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>
      </section>

      <section className="whyUs">
        <div className="sectionHeading w-[50%]">
          <h3 className="text-[1.6rem] font-medium max-[665px]:text-[1.2rem]">
            WHY <span className="text-[#374151]">CHOOSE US</span>
          </h3>
        </div>

        <div className="flex text-[#5c5c5c] py-8 max-[990px]:flex-wrap max-[990px]:gap-2 justify-center">
          <div className="border border-[#4b5563] p-16 w-[347px] hover:bg-[#6C63FF] hover:text-white">
            <h5 className="font-medium mb-5">EFFICIENCY:</h5>
            <p>
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="border border-[#4b5563] p-16 w-[347px] hover:bg-[#6C63FF] hover:text-white">
            <h5 className="font-medium mb-5">CONVENIENCE:</h5>
            <p>
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="border border-[#4b5563] p-16 w-[347px] hover:bg-[#6C63FF] hover:text-white">
            <h5 className="font-medium mb-5">PERSONALIZATION:</h5>
            <p>
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
