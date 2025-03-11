// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Myappoinments from './pages/Myappoinments'
import Myprofile from './pages/Myprofile'
import Appoinments from './pages/Appoinment'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/doctors/:specility' element={<Doctors />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/myappoinments' element={<Myappoinments />}/>
        <Route path='/appoinments/:docId' element={<Appoinments />}/>
        <Route path='/myprofile' element={<Myprofile />}/>
      </Routes>
    </div> 
  )
}

export default App
