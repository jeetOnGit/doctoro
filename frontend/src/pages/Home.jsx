import React, { useContext } from 'react'
import { assets, specialityData, localDocs } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Home = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate()
  const firstTenDocs = doctors.slice(0, 10);

  
  return (
    <div>
      <section className='heroSectionWrapper mt-4'>
        <div className='heroSecion flex bg-[#5F6FFF] text-white px-16 rounded-lg h-[450px] items-center max-[1200px]:flex-col max-[1200px]:h-fit max-[700px]:px-6 max-[700px]:pt-5'>
          <div className='max-[1200px]:text-center'>
            <h2 className='text-[2.7rem] font-semibold leading-snug max-[700px]:text-[1.5rem]'>Book Appointment With Trusted Doctors</h2>
            <div className='flex gap-3 my-5 max-[1200px]:flex-col items-center'>
              <img className='w-[100px] max-[1200px]:w-[70px]' src={assets.group_profiles} alt="" />
              <p className='text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            </div>
            <button className='bg-white text-[#595959] px-8 py-3 text-xs rounded-full hover:scale-105'><Link to='/'>Book appointment <i className="fa-solid fa-arrow-right me-2" /></Link></button>
          </div>
          <div className='self-end max-[1200px]:self-center'>
            <img className='max-[1200px]:w-[500px]' src={assets.header_img} alt="" />
          </div>
        </div>
      </section>
      
      <section className='specialist py-16'>
        <div className="sectionHeading mx-auto text-center w-[50%] max-[560px]:w-[90%]">
          <h3 className='text-[1.6rem] font-medium'>Find by Speciality</h3>
          <p className='text-[0.8rem]'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        </div>

        <div className='flex justify-center py-10 gap-7  max-[898px]:flex-wrap'>
          {specialityData.map((speciality) => (
            
              <ul className='text-center flex flex-col items-center hover:-translate-y-3 transition-all ease-in-out delay-75'>
                <li><img className='w-[100px]' src={speciality.image} alt="" /></li>
                <li><p className='text-[0.7rem]'>{speciality.speciality}</p></li>
              </ul>
            
          ))}
        </div>
      </section>

      <section className='doctors'>
        <div className="sectionHeading mx-auto text-center w-[50%] max-[560px]:w-[90%]">
          <h3 className='text-[1.6rem] font-medium'>Top Doctors to Book</h3>
          <p className='text-[0.8rem]'>Simply browse through our extensive list of trusted doctors.</p>
        </div>

        <div className='flex gap-x-3 gap-y-[1.5rem] flex-wrap py-8 justify-center'>
          
          {firstTenDocs.map((doc) => (
            <div key={doc._id}  onClick={() => {
              const token = localStorage.getItem('token');
              if (token) {
                navigate(`/appointment/${doc._id}`);
              } else {
                navigate('/login');
              }
            }} className='w-[24%] border border-[#c9d8ff] rounded-lg hover:-translate-y-3 transition-all ease-in-out delay-75  max-[700px]:w-fit'>
              <div className="img"><img className='bg-[#EAEFFF]' src={doc.image} alt="" /></div>
              <div className="details">
                <ul className='py-3 px-2'>
                  <li className='text-green-600 text-[0.8rem]'> <i class="fa-solid fa-circle" />Available</li>
                  <li className='font-medium'>{doc.name}</li>
                  <li className='text-[0.8rem] text-[#5c5c5c]'>{doc.speciality}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
          <button className='bg-[#EAEFFF] text-[#595959] px-8 py-3 text-center rounded-full mx-auto'><Link className='text-center' to='/'>more</Link></button>

      </section>

      <section className='heroSectionWrapper mt-4 py-10'>
        <div className='heroSecion flex justify-evenly bg-[#5F6FFF] text-white px-16 rounded-lg h-[400px] items-center max-[1200px]:flex-col max-[1200px]:h-fit  max-[1200px]:gap-8'>
          <div className='w-[50%] max-[1200px]:text-center max-[1200px]:w-fit  max-[1200px]:mt-6'>
            <h2 className='text-[2.9rem] font-semibold leading-snug max-[700px]:text-[1.5rem]'>Book Appointment With 100+ Trusted Doctors</h2>
            

            <button className='bg-white text-[#595959] px-8 py-4 text-xs rounded-full hover:scale-105 mt-5  max-[700px]:py-2  max-[700px]:px-4'><Link to='/'>Create account</Link></button>
          </div>
          <div className='self-end w-[40%] max-[1200px]:self-center'>
            <img className='' src={assets.appointment_img} alt="" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home