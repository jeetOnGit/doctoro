import React, { useEffect, useState, useContext, useDeferredValue } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDocs from "../components/RelatedDocs";
import { toast } from "react-toastify";
import axios from "axios";

const Appoinment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, getDoctorData, token } = useContext(AppContext);
  const navigate = useNavigate()
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const daysofWeek = ['Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat', 'Sun']

  const slotAvailable = async () => {
    let today = new Date();
    let slots = [];
  
    // If the time is after 10 PM, move to the next day
    if (today.getHours() >= 22) {
      today.setDate(today.getDate() + 1);
      today.setHours(0, 0, 0, 0); // Reset time to midnight
    }
  
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
  
      if (i === 0) {
        // If it's today, check the current time
        if (today.getHours() >= 22) {
          continue; // Skip today and move to the next available date
        }
  
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
  
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        
        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()

        const slotDate = day + '_' + month + '_' + year 
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true 

        if (isSlotAvailable) {
          //ADD slot to array
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }
       
  
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      slots.push(timeSlots);
    }
  
    setDocSlots(slots);
  };
  
  const bookAppointment = async() =>{
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {
      const date = docSlots[slotIndex][0].dateTime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + '_' + month + '_' + year

      const {data} = await axios.post(backendUrl + '/api/user/book-appointment', {docId, slotDate, slotTime}, {headers:{ Authorization: `Bearer ${token}`}})
      
      if (data.success) {
        toast.success(data.message);
        await getDoctorData();
        navigate('/myappoinments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  }, [doctors, docId]);

  useEffect(()=>{
    if (docInfo) {
      slotAvailable();
    }
  },[docInfo])

  // useEffect(()=>{
  //   console.log(docSlots)
  // },[docSlots])


  return (
    docInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4 py-7">
          <div>
            <img
              className="bg-[#5F6FFF] w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600 ">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About<img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>
            <p className="text-gray-500 font-medium mt-4">Appointment Fee: {currencySymbol}{docInfo.fees}</p>
          </div>
        </div>

        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full mt-4 whitespace-nowrap scroll-smooth select-none no-scrollbar cursor-pointer">
            {
              docSlots.length && docSlots.map((item, index)=>(
                <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#5F6FFF] text-white' : 'border border-gray-300'}`} key={index}>
                  <p>{item[1] && daysofWeek[item[1].dateTime.getDay()]}</p>
                  <p>{item[1] && item[1].dateTime.getDate()}</p>
                </div>
              ))
            }
          </div>

          <div className="flex items-center gap-3 w-full flex-wrap mt-4">
            {docSlots.length && docSlots[slotIndex].map((item, index)=>(
              <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#5F6FFF] text-white' : 'text-gray-400 border border-gray-300'}`}>
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          <button onClick={bookAppointment} className="bg-[#6C63FF] text-white text-sm font-light px-14 py-3 rounded-full my-6">Book a appointment</button>
        </div>

        {/* Realated Doctors List */}

        <RelatedDocs docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appoinment;
