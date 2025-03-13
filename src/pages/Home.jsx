import React from 'react'
import { assets, specialityData, doctors } from '../assets/assets'
import { Link } from 'react-router-dom'

const Home = () => {

  const firstTenDocs = doctors.slice(0, 10)

  
  return (
    <div>
      <section className='heroSectionWrapper mt-4'>
        <div className='heroSecion flex bg-[#5F6FFF] text-white px-16 rounded-lg h-[450px] items-center'>
          <div>
            <h2 className='text-[2.7rem] font-semibold leading-snug'>Book Appointment With Trusted Doctors</h2>
            <div className='flex gap-3 my-5'>
              <img className='w-[100px]' src={assets.group_profiles} alt="" />
              <p className='text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            </div>
            <button className='bg-white text-[#595959] px-8 py-3 text-xs rounded-full hover:scale-105'><Link to='/'>Book appointment <i className="fa-solid fa-arrow-right me-2" /></Link></button>
          </div>
          <div className='self-end'>
            <img className='' src={assets.header_img} alt="" />
          </div>
        </div>
      </section>
      
      <section className='specialist py-16'>
        <div className="sectionHeading mx-auto text-center w-[50%]">
          <h3 className='text-[1.6rem] font-medium'>Find by Speciality</h3>
          <p className='text-[0.8rem]'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        </div>

        <div className='flex justify-center py-10 gap-7'>
          {specialityData.map((speciality) => (
            
              <ul className='text-center flex flex-col items-center hover:-translate-y-3 transition-all ease-in-out delay-75'>
                <li><img className='w-[100px]' src={speciality.image} alt="" /></li>
                <li><p className='text-[0.7rem]'>{speciality.speciality}</p></li>
              </ul>
            
          ))}
        </div>
      </section>

      <section className='doctors'>
        <div className="sectionHeading mx-auto text-center w-[50%]">
          <h3 className='text-[1.6rem] font-medium'>Top Doctors to Book</h3>
          <p className='text-[0.8rem]'>Simply browse through our extensive list of trusted doctors.</p>
        </div>

        <div className='flex gap-x-3 gap-y-[1.5rem] flex-wrap py-8'>
          
          {firstTenDocs.map((doc) => (
            <div className='w-[24%] border border-[#c9d8ff] rounded-lg hover:-translate-y-3 transition-all ease-in-out delay-75'>
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
        <div className='heroSecion flex justify-evenly bg-[#5F6FFF] text-white px-16 rounded-lg h-[400px] items-center'>
          <div className='w-[50%]'>
            <h2 className='text-[2.9rem] font-semibold leading-snug'>Book Appointment With 100+ Trusted Doctors</h2>
            

            <button className='bg-white text-[#595959] px-8 py-4 text-xs rounded-full hover:scale-105 mt-5'><Link to='/'>Create account</Link></button>
          </div>
          <div className='self-end w-[40%]'>
            <img className='' src={assets.appointment_img} alt="" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home