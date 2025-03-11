import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <section className='heroSectionWrapper mt-4'>
        <div className='heroSecion flex bg-[#5F6FFF] text-white px-16 rounded-lg h-[83vh] items-center'>
          <div>
            <h2 className='text-[2.9rem] font-semibold leading-snug'>Book Appointment With Trusted Doctors</h2>
            <div className='flex gap-3 my-5'>
              <img className='w-[100px]' src={assets.group_profiles} alt="" />
              <p className='text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            </div>
            <button className='bg-white text-[#595959] px-8 py-3 text-xs rounded-full'><Link to='/'>Book appointment <i className="fa-solid fa-arrow-right me-2" /></Link></button>
          </div>
          <div className='self-end'>
            <img className='w-[900px]' src={assets.header_img} alt="" />
          </div>
        </div>
      </section>
      
    </div>
  )
}

export default Home