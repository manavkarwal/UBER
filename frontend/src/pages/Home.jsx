import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';




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

    <div className='overflow-hidden h-screen relative'>

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

        <div ref={panelRef} className='h-[70%] bg-white   '>
          <LocationSearchPanel />
        </div>

      </div>

      <div className='fixed w-full px-3 translate-x-full py-6 bg-white z-10 bottom-0 '>
        <h2 className='text-3xl font-semibold mb-5'>Choose a vehicle</h2>
        <div className='flex border-2 border-gray-400  active:border-black rounded-xl mb-2 w-full p-3 items-center justify-between'>
          <img className='h-15 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png" alt="" srcset="" />
          <div className=' ml-2 w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className='ri-user-3-fill'></i>4</span></h4>
            <h5 className='font-medium text-sm'>mins away</h5>
            <p className='font-normal text-sm text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹193.20</h2>
        </div>
        <div className='flex border-2 border-gray-400 active:border-black  rounded-xl mb-2 w-full p-3 items-center justify-between'>
          <img className='h-13 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" srcset="" />
          <div className=' ml-3 w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className='ri-user-3-fill'></i>4</span></h4>
            <h5 className='font-medium text-sm'>mins away</h5>
            <p className='font-normal text-sm text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹193.20</h2>
        </div>
        <div className='flex border-2 border-gray-400 active:border-black  rounded-xl mb-2 w-full p-3 items-center justify-between'>
          <img className='h-14 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1571927853/assets/39/c1c2c7-61eb-4432-9bac-728b974207e7/original/cityscoot-icon-mobile.png" alt="" srcset="" />
          <div className='  w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className='ri-user-3-fill'></i>4</span></h4>
            <h5 className='font-medium text-sm'>mins away</h5>
            <p className='font-normal text-sm text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹193.20</h2>
        </div>

      </div>
    </div>

  )
}

export default Home
