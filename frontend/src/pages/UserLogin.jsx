import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';


const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();

    const { user, setUser } = useContext(UserDataContext);


    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = ({
            email: email,
            password: password
        })

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);


        if (response.status === 201) {
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/Home')
        }
        console.log(userData)
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
                    className='bg-gray-200 rounded-md mt-2 outline-none  mx-3 py-4 px-2 placeholder:text-2xl' type="email" placeholder='enter your email' />
                <h3 className='text-3xl font-semibold mt-5 mx-3'>Enter password</h3>
                <input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    className='bg-gray-200 rounded-md mt-2 outline-none mx-3 py-4 px-2 placeholder:text-2xl' type="password" placeholder='enter your password' />
                <button className='bg-black mx-3 text-3xl font-semibold px-2  py-3 rounded-md mt-8  text-white  flex items-center justify-center'>Login
                </button>
                <div className=' mt-5 flex items-center justify-center'>
                    <p className='text-xl'>New Here? <Link to='/signup' className='text-blue-300'>Create new Account</Link> </p>
                </div>
            </form>

            <div className='flex items-center justify-center '>
                <Link to='/captain-login' className='bg-amber-600 text-3xl font-semibold py-4  rounded-md px-15  text-white  flex items-center justify-center'>Login as a Captain
                </Link>
            </div>

        </div>
    )
}

export default UserLogin
