import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {doctors} from '../assets/assets'
// import { AppContext } from "../context/AppContext";
const Doctors = () => {
  const navigate = useNavigate()
    // const { doctors } = useContext(AppContext);

    
  
  return (
    <section className="doctors">
      <div className="flex gap-x-3 gap-y-[1.5rem] flex-wrap py-8 justify-center">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            onClick={() => {
              navigate(`/appointment/${doc._id}`);
            }}
            className="w-[24%] border border-[#c9d8ff] rounded-lg hover:-translate-y-3 transition-all ease-in-out delay-75 max-[700px]:w-fit"
          >
            <div className="img">
              <img className="bg-[#EAEFFF]" src={doc.image} alt="" />
            </div>
            <div className="details">
              <ul className="py-3 px-2">
                <li className="text-green-600 text-[0.8rem]">
                  <i class="fa-solid fa-circle" />
                  Available
                </li>
                <li className="font-medium">{doc.name}</li>
                <li className="text-[0.8rem] text-[#5c5c5c]">
                  {doc.speciality}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Doctors;
