import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain);

   
    if (response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('tokenn', data.tokenn)
        navigate('/captain-home')
    }
  
    setEmail('')
    setPassword('');
  }

  return (
    <div className='flex flex-col gap-5 '>

      <form onSubmit={(e) => submitHandler(e)} className='flex flex-col '>
        <img className='w-30 mt-4 ml-2 ' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png" alt="" />
        <h3 className='text-3xl font-semibold mt-10 mx-3'>What's your email </h3>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          className='bg-gray-200 text-3xl   rounded-md mt-2 outline-none  mx-3 py-2 px-2 placeholder:text-2xl' type="email" placeholder='enter your email' />
        <h3 className='text-3xl font-semibold mt-5 mx-3'>Enter password</h3>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          className='bg-gray-200 text-3xl   rounded-md mt-2 outline-none  mx-3 py-2 px-2 placeholder:text-2xl' type="password" placeholder='enter your password' />
        <button className='bg-black mx-3 text-3xl font-semibold px-2  py-3 rounded-md mt-8  text-white  flex items-center justify-center'>Login
        </button>
        <div className=' mt-5 flex items-center justify-center'>
          <p className='text-xl'>Join a fleet? <Link to='/captain-signup' className='text-blue-300'>Register as a Captain</Link> </p>
        </div>
      </form>

      <div className='flex items-center justify-center '>
        <Link to='/login' className='bg-amber-700 text-3xl font-semibold py-4  rounded-md px-15  text-white  flex items-center justify-center'>Login as a User
        </Link>
      </div>

    </div>
  )
}

export default CaptainLogin
