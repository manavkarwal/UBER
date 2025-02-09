import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDrivers from '../components/WaitingForDriver'

// Add these new functions after the imports and before the Home component

const fetchPickupLocations = async (query) => {
  try {
    const response = await fetch(`YOUR_API_ENDPOINT/search?query=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pickup locations:', error);
    return [];
  }
};

const fetchDestinationLocations = async (query) => {
  try {
    const response = await fetch(`YOUR_API_ENDPOINT/search?query=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching destination locations:', error);
    return [];
  }
};

const Home = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // 'pickup' or 'destination'
  const [searchInput, setSearchInput] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const handlePickupFocus = () => {
    setActiveInput('pickup');
    setPanelOpen(true);
  };

  const handleDestinationFocus = () => {
    setActiveInput('destination');
    setPanelOpen(true);
  };

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    setSearchInput(value);
    
    if (value.length >= 3) {
      const locations = await fetchPickupLocations(value);
      // Handle the locations data as needed
      // You might want to add a new state to store the suggestions
      // setPickupSuggestions(locations);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    setSearchInput(value);
  
    if (value.length >= 3) {
      const locations = await fetchDestinationLocations(value);
      // Handle the locations data as needed
      // You might want to add a new state to store the suggestions
      // setDestinationSuggestions(locations);
    }
  };

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


  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

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
              onClick={handlePickupFocus}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-gray-200 text-3xl w-full  rounded-md mt-5 outline-none   py-2 px-2 placeholder:text-2xl' type='text' placeholder='Add a pickup location'></input>
            <input
              onClick={handleDestinationFocus}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-gray-200 text-3xl w-full  rounded-md mt-5 outline-none   py-2 px-2 placeholder:text-2xl' type="text" placeholder='enter your destination' />
          </form>
        </div>

        <div ref={panelRef} className='h-[70%] bg-white   '>
          <LocationSearchPanel 
            setPanelOpen={setPanelOpen} 
            setVehiclePanel={setVehiclePanel} 
            searchInput={searchInput}
            isPickup={activeInput === 'pickup'}
            setPickup={setPickup}
            setDestination={setDestination}
            suggestions={activeInput === 'pickup' ? pickupSuggestions : destinationSuggestions}
          />
        </div>

      </div>
      <div ref={vehiclePanelRef} className='fixed w-full px-3 translate-y-full py-6 bg-white z-10 bottom-0 '>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full px-3 translate-y-full py-6 bg-white z-10 bottom-0 '>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full px-3 translate-y-full py-6 bg-white z-10 bottom-0 '>
        <LookingForDriver  setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div  ref={waitingForDriverRef}  className='fixed w-full px-3  translate-y-full  py-6 bg-white z-10 bottom-0 '>
        <WaitingForDrivers  waitingForDriver={waitingForDriver}  />
      </div>
    </div>

  )
}

export default Home
