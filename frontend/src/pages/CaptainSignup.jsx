import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CapatainContext';


const CaptainSignUp = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
    const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      vehicle:{
        color:vehicleColor,
        plate:vehiclePlate,
        capacity:vehicleCapacity,
        vehicleType:vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);


    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-login')
    }

    
    setEmail('')
    setPassword('');
    setFirstname('');
    setLastname('');
    setVehicleCapacity('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleType('');
  }
  return (
    <div className='flex flex-col gap-5 '>

      <form onSubmit={(e) => submitHandler(e)} className='flex flex-col '>
        <img className='w-30 mt-4 ml-2 ' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png" alt="" />
        <h3 className='text-3xl font-semibold mt-10 mx-3'>Enter your Fullname</h3>
        <div className='flex gap-3 mt-2'>
          <input
            required
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value)
            }}
            className='bg-gray-200 rounded-md ml-2 outline-none  py-4 px-2 placeholder:text-2xl' type="text" placeholder='firstname' />
          <input
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value)
            }}
            className='bg-gray-200 rounded-md ml-2  outline-none   py-4 px-2 placeholder:text-2xl' type="text" placeholder='lastname' />

        </div>
        <h3 className='text-3xl font-semibold mt-5 mx-3'>What's your email </h3>
        <input
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          className='bg-gray-200 rounded-md mt-2 outline-none  mx-3 py-4 px-2 placeholder:text-2xl' type="email" placeholder='enter your email' />
        <h3 className='text-3xl font-semibold mt-5 mx-3'>Enter password</h3>
        <input
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          className='bg-gray-200 rounded-md mt-2 outline-none mx-3 py-4 px-2 placeholder:text-2xl' type="password" placeholder='enter your password' />
        <h3 className='text-3xl font-semibold mt-5 mx-3'>Vehicle details</h3>
        <div className='flex gap-3 mt-2'>
          <input
            required
            value={vehicleColor}
            onChange={(e) => {
              setVehicleColor(e.target.value)
            }}
            className='bg-gray-200 rounded-md ml-2 outline-none  py-4 px-2 placeholder:text-2xl' type="text" placeholder='vehicle color' />
          <input
            required
            value={vehiclePlate}
            onChange={(e) => {
              setVehiclePlate(e.target.value)
            }}
            className='bg-gray-200 rounded-md ml-2  outline-none   py-4 px-2 placeholder:text-2xl' type="text" placeholder='vehicle plate ' />

        </div>
        <div className='flex gap-3 mt-5'>
          <input
            required
            value={vehicleCapacity}
            onChange={(e) => {
              setVehicleCapacity(e.target.value)
            }}
            className='bg-gray-200 rounded-md ml-2 outline-none  py-4 px-2 placeholder:text-2xl' type="text" placeholder='vehicle capacity' />
          <select
            required
            className='bg-gray-200 rounded-md ml-2 outline-none  py-4 px-2 placeholder:text-2xl'
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value)
            }}
          >
            <option value="">Select VehicleType</option>
            <option value="car" >Car</option>
            <option value="auto" >Auto</option>
            <option value="moterCyle" >Bike</option>


          </select>

        </div>
        <button className='bg-black mx-3 text-3xl font-semibold px-2  py-3 rounded-md mt-8  text-white  flex items-center justify-center'>Register
        </button>
        <div className=' mt-5 flex items-center justify-center'>
          <p className='text-xl'>I have a Already Account <Link to='/captain-login' className='text-blue-300'>login Captain</Link> </p>
        </div>
      </form>
    </div>
  )
}

export default CaptainSignUp
