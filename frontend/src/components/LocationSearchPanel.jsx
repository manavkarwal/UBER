import React from 'react'

const LocationSearchPanel = (props) => {
    
    const locations = [
        "24,a Near Kapoor,s cafe, Sheriyans coding school,Bhopal",
        "25,b Near Kapoor,s cafe, Sheriyans coding school,Bhopal",
        "26,c Near Kapoor,s cafe, Sheriyans coding school,Bhopal",
        "27,d Near Kapoor,s cafe, Sheriyans coding school,Bhopal"
    ]



    return (
        <div>
            {/* this is sample */}
            {
                locations.map((elem , idx)=> {
                    return   <div key={idx} onClick={()=> {
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} className='flex rounded-2xl  gap-3 mb-2 border-gray-300 border-2 p-3 active:border-black  items-center'>
                    <h2 className='text-xl bg-gray-300 py-2  px-3 rounded-full'>
                        <i className="ri-map-pin-line"></i>
                    </h2>
                    <h4 className='font-semibold text-lg'>
                        {elem}
                    </h4>
                </div>
                })
          
            }
         
        </div>
    )
}

export default LocationSearchPanel
