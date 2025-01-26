import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainSignUp = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [capatainData, setCaptainData] = useState({});


  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    })
    console.log(capatainData)
    setEmail('')
    setPassword('');
    setFirstname('');
    setLastname('');
  }
  return (
    <div className='flex flex-col gap-5 '>

      <form onSubmit={(e) => submitHandler(e)} className='flex flex-col '>
        <img className='w-30 mt-4 ml-2 ' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png" alt="" />
        <h3 className='text-3xl font-semibold mt-10 mx-3'>Enter your Fullname</h3>
        <div className='flex gap-3 mt-2'>
          <input
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
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          className='bg-gray-200 rounded-md mt-2 outline-none  mx-3 py-4 px-2 placeholder:text-2xl' type="email" placeholder='enter your email' />
        <h3 className='text-3xl font-semibold mt-5 mx-3'>Enter password</h3>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          className='bg-gray-200 rounded-md mt-2 outline-none mx-3 py-4 px-2 placeholder:text-2xl' type="password" placeholder='enter your password' />
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
