import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import { Try } from '@mui/icons-material'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email,SetEmail] = useState('')
  const [password,SetPassword] = useState('')

  const {setAToken,backendUrl} = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if(state === 'Admin'){
        const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
        if(data.success){
          localStorage.setItem('aToken',data.token)
          setAToken(data.token);
          console.log(data.token);
          
        }
        else{
          toast.error(data.message)
        }
      }
      
    } catch (error) {
      
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
          <p className='text-2xl font-semibold m-auto'><span className='text-[var(--color-primary)]'>{state}</span> Login</p>
          <div className='w-full'>
            <p>Email</p>
            <input onChange={(e)=>SetEmail(e.target.value)} value={email} className='border  border-[#DADADA] rounded w-full mt-1 p-1' type="text" required />
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input onChange={(e)=>SetPassword(e.target.value)} value={password} className='border  border-[#DADADA] rounded w-full mt-1 p-1' type="password" required />
          </div>
          <button className='bg-[var(--color-primary)] text-white w-full py-2 rounded-md text-base cursor-pointer'>Login</button>
          {
            state === 'Admin'
              ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='cursor-pointer text-[var(--color-primary)] underline'>Click here</span></p> :
              <p>Adimn Login? <span onClick={() => setState('Admin')} className='cursor-pointer text-[var(--color-primary)] underline'>Click here</span></p>
          }
        </div>
      </form>
    </div>
  )
}

export default Login
