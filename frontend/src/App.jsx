// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Myappoinments from './pages/Myappoinments'
import Myprofile from './pages/Myprofile'
import Appoinment from './pages/Appoinment'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
function App() {

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/doctors' element={<Doctors />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/myappoinments' element={<Myappoinments />}/>
        <Route path='/appointment/:docId' element={<Appoinment />}/>
        <Route path='/myprofile' element={<Myprofile />}/>
      </Routes>
      <Footer />
    </div> 
  )
}

export default App
