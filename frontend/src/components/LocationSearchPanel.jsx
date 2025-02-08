import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanel, searchInput, isPickup, setPickup, setDestination }) => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchInput && searchInput.length >= 3) {
                try {
                    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${searchInput}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setSuggestions(response.data.suggestions);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [searchInput]);

    const handleLocationSelect = (suggestion) => {
        if (isPickup) {
            setPickup(suggestion.label);
        } else {
            setDestination(suggestion.label);
        }
        setPanelOpen(false);
        setVehiclePanel(true);
    };

    return (
        <div>
            {suggestions.map((suggestion, idx) => (
                <div 
                    key={idx} 
                    onClick={() => handleLocationSelect(suggestion)} 
                    className='flex rounded-2xl gap-3 mb-2 border-gray-300 border-2 p-3 active:border-black items-center cursor-pointer'
                >
                    <h2 className='text-xl bg-gray-300 py-2 px-3 rounded-full'>
                        <i className="ri-map-pin-line"></i>
                    </h2>
                    <h4 className='font-semibold text-lg'>
                        {suggestion.label}
                    </h4>
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPanel
