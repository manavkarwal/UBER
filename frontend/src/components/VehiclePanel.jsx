import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h2 className='text-center text-2xl' onClick={() => {
          props.setVehiclePanel(false)
        }}>   <i className="ri-arrow-down-wide-line"></i> </h2>
        <h2 className='text-3xl font-semibold mb-5'>Choose a vehicle</h2>
        <div onClick={()=> {
            props.setConfirmRidePanel(true)
        }} className='flex border-2 border-gray-400  active:border-black rounded-xl mb-2 w-full p-3 items-center justify-between'>
          <img className='h-15 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png" alt="" srcset="" />
          <div className=' ml-2 w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className='ri-user-3-fill'></i>4</span></h4>
            <h5 className='font-medium text-sm'>mins away</h5>
            <p className='font-normal text-sm text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹193.20</h2>
        </div>
        <div onClick={()=> {
            props.setConfirmRidePanel(true)
        }} className='flex border-2 border-gray-400 active:border-black  rounded-xl mb-2 w-full p-3 items-center justify-between'>
          <img className='h-13 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" srcset="" />
          <div className=' ml-3 w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className='ri-user-3-fill'></i>4</span></h4>
            <h5 className='font-medium text-sm'>mins away</h5>
            <p className='font-normal text-sm text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹193.20</h2>
        </div>
        <div onClick={()=> {
            props.setConfirmRidePanel(true)
        }} className='flex border-2 border-gray-400 active:border-black  rounded-xl mb-2 w-full p-3 items-center justify-between'>
          <img className='h-14 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1571927853/assets/39/c1c2c7-61eb-4432-9bac-728b974207e7/original/cityscoot-icon-mobile.png" alt="" srcset="" />
          <div className='  w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className='ri-user-3-fill'></i>4</span></h4>
            <h5 className='font-medium text-sm'>mins away</h5>
            <p className='font-normal text-sm text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹193.20</h2>
        </div>
    </div>
  )
}

export default VehiclePanel
