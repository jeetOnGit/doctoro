import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDocs = ({docId, speciality}) => {
  const navigate = useNavigate()

    const {doctors} = useContext(AppContext)
    const [relDocs, setRelDocs] = useState([])

    useEffect(()=>{
      if (doctors.length > 0 && speciality) {
        const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId)
        setRelDocs(doctorsData)
      }
    },[docId,doctors,speciality])
  return (
    <div>
      <div className="flex gap-x-3 gap-y-[1.5rem] flex-wrap py-8 justify-center">
        {relDocs.slice(0,5).map((doc) => (
          <div
            key={doc._id}
            onClick={() => {
              {navigate(`/appointment/${doc._id}`)};
              scrollTo(0,0)
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
    </div>
  )
}

export default RelatedDocs