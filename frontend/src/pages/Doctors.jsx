import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {localDocs} from '../assets/assets'
import { AppContext } from "../context/AppContext";
import ScaleLoader from "react-spinners/ScaleLoader";

const Doctors = () => {
  const navigate = useNavigate()
    const { doctors } = useContext(AppContext);
    const [color, setColor] = useState("#6C63FF");
  
  return (
    <section className="doctors">
      {
        doctors.length > 0 ? (
          <div className="flex gap-x-3 gap-y-[1.5rem] flex-wrap py-8 justify-center">
      {
          doctors.map((doc) => (
            <div
              key={doc._id}
              onClick={() => {
                const token = localStorage.getItem('token');
                if (token) {
                  navigate(`/appointment/${doc._id}`);
                } else {
                  navigate('/login');
                }
              }}
              className="w-[24%] border border-[#c9d8ff] rounded-lg hover:-translate-y-3 transition-all ease-in-out delay-75 max-[700px]:w-fit"
            >
              <div className="img">
                <img className="bg-[#EAEFFF]" src={doc.image} alt={doc.name} />
              </div>
              <div className="details">
                <ul className="py-3 px-2">
                  <li className="text-green-600 text-[0.8rem]">
                    <i className="fa-solid fa-circle" />
                    Available
                  </li>
                  <li className="font-medium">{doc.name}</li>
                  <li className="text-[0.8rem] text-[#5c5c5c]">{doc.speciality}</li>
                </ul>
              </div>
            </div>
          ))}
      </div>
        )
        : (
          <ScaleLoader
            className="text-center mt-4 w-full"
            color={color}
            loading="true"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )
      }
    </section>
  );
};

export default Doctors;
