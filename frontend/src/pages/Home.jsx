import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'




const Home = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
        // opacity:1
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0
        // opacity:0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])



  const submitHandler = (e) => {
    e.preventDefault();

  }

  return (

    <div >
      <img className='w-20 mt-4 ml-2 ' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png" alt="" />
      <div className='h-screen w-screen '>
        map
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0'>
        <div className='h-[30%] p-5   bg-gray-100'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h3 className='text-4xl font-bold'>Find a trip</h3>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>

            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) =>
                setPickup(e.target.value)
              }
              className='bg-gray-200 text-3xl w-full  rounded-md mt-5 outline-none   py-2 px-2 placeholder:text-2xl' type='text' placeholder='Add a pickup location'></input>
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) =>
                setDestination(e.target.value)
              }
              className='bg-gray-200 text-3xl w-full  rounded-md mt-5 outline-none   py-2 px-2 placeholder:text-2xl' type="text" placeholder='enter your destination' />
          </form>
        </div>
        <div ref={panelRef} className='h-[70%] bg-red-900    '>

        </div>
      </div>
    </div>

  )
}

export default Home
