import React from 'react'
import { Link } from 'react-router-dom'


const Start = () => {
    return (
        <div>
            <div className='bg-cover pt-10 pl-2 h-170 lg:bg-left lg:h-110 lg:w-339 lg:bg-[url(https://images.pexels.com/photos/19251906/pexels-photo-19251906/free-photo-of-closeup-of-a-green-pedestrian-light.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]  bg-[url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Modern_British_LED_Traffic_Light.jpg/1200px-Modern_British_LED_Traffic_Light.jpg)]  '>
                <img className='w-25  ' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png" alt="" />
            </div>
            <div className='  flex flex-col py-5 px-5'>
                <h1 className='text-black text-2xl mt-2  '>Get Started With Uber </h1>
                <Link to='/login' className='bg-black text-3xl font-semibold p-4  rounded-md mt-4  text-white  flex items-center justify-center'>Continue
                 </Link>
            </div>
        </div>
    )
}

export default Start
