import React from 'react'

const LocationSearchPanel = () => {
    return (
        <div>
            {/* this is sample */}
            <div className='flex rounded-2xl  gap-3 mb-2 border-gray-300 border-2 p-3 active:border-black  items-center'>
                <h2 className='text-xl bg-gray-300 py-2  px-3 rounded-full'>
                    <i class="ri-map-pin-line"></i>
                </h2>
                <h4  className='font-semibold text-lg'>
                    24,B Near Kapoor,s cafe, Sheriyans coding school,Bhopal
                </h4>
            </div>
            <div className='flex gap-3 rounded-2xl  mb-2 border-gray-300 border-2 p-3 active:border-black  items-center'>
                <h2 className='text-xl bg-gray-300 py-2  px-3 rounded-full'>
                    <i class="ri-map-pin-line"></i>
                </h2>
                <h4  className='font-semibold text-lg'>
                    24,B Near Kapoor,s cafe, Sheriyans coding school,Bhopal
                </h4>
            </div>
            <div className='flex gap-3 mb-2 border-gray-300 rounded-2xl  border-2 p-3 active:border-black  items-center'>
                <h2 className='text-xl bg-gray-300 py-2  px-3 rounded-full'>
                    <i class="ri-map-pin-line"></i>
                </h2>
                <h4  className='font-semibold text-lg'>
                    24,B Near Kapoor,s cafe, Sheriyans coding school,Bhopal
                </h4>
            </div>
        </div>
    )
}

export default LocationSearchPanel
