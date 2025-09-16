import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Slidebar = () => {
  const {aToken} = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r'>
      { 
        aToken && <ul className='text-[#515151] mt-5'>
          <NavLink to={'/admin-dashboard'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[var(--color-primary)]' : ''}`}>
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink to={'/all-apoinments'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[var(--color-primary)]' : ''}`}>
            <img src={assets.appointment_icon} alt="" />
            <p>Appoinments</p>
          </NavLink>
          <NavLink to={'/add-doctor'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[var(--color-primary)]' : ''}`}>
            <img src={assets.add_icon} alt="" />
            <p>Add Doctors</p>
          </NavLink>
          <NavLink to={'/doctor-list'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[var(--color-primary)]' : ''}`}>
            <img src={assets.people_icon} alt="" />
            <p>Doctor List</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Slidebar
