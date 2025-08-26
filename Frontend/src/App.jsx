import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home  from './Pages/Home'
import Doctors  from './Pages/Doctors'
import Login from './Pages/Login'
import About from './Pages/About'
import Contact from './Pages/Contact'
import MyProfile from './Pages/MyProfile'
import MyAppointsment from './Pages/MyAppointsment'
import Appointment from './Pages/Appointment'
import Navbar from './Components/Navbar'
import Footter from './Components/Footter'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/doctors/:specialitt' element={<Doctors/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About />}/>
      <Route path='/contact' element={<Contact />}/>
      <Route path='/my-profile' element={<MyProfile />}/>
      <Route path='/my-appointments' element={<MyAppointsment />}/>
      <Route path='/appointments' element={<Appointment />}/>
     </Routes>
     <Footter/>
     
    </div>
  )
}

export default App
