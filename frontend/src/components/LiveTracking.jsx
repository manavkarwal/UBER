// import React, { useEffect, useRef } from 'react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import axios from 'axios';

// const LiveTracking = ({ pickup, destination, captain }) => {
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const routeLayerRef = useRef(null);
//   const markersRef = useRef({
//     pickup: null,
//     destination: null,
//     captain: null
//   });

//   // Initialize map
//   useEffect(() => {
//     if (!mapRef.current) return;

//     // Create map instance
//     mapInstanceRef.current = L.map(mapRef.current).setView([20.5937, 78.9629], 13);

//     // Add OSM tile layer
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors'
//     }).addTo(mapInstanceRef.current);

//     // Cleanup on unmount
//     return () => {
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove();
//       }
//     };
//   }, []);

//   // Update markers and route
//   useEffect(() => {
//     async function updateMap() {
//       if (!mapInstanceRef.current || !pickup || !destination) return;

//       try {
//         // Get coordinates for pickup and destination
//         const pickupCoords = await getCoordinates(pickup);
//         const destinationCoords = await getCoordinates(destination);

//         // Update/create markers
//         updateMarker('pickup', pickupCoords, '🚩');
//         updateMarker('destination', destinationCoords, '🏁');
        
//         if (captain?.location) {
//           updateMarker('captain', captain.location, '🚗');
//         }

//         // Draw route
//         await drawRoute(pickupCoords, destinationCoords);

//         // Fit map bounds to show all markers
//         const bounds = L.latLngBounds([
//           [pickupCoords.lat, pickupCoords.lon],
//           [destinationCoords.lat, destinationCoords.lon]
//         ]);
//         mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });

//       } catch (error) {
//         console.error('Error updating map:', error);
//       }
//     }

//     updateMap();
//   }, [pickup, destination, captain]);

//   // Helper function to get coordinates from address
//   const getCoordinates = async (address) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
//           params: { address },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         }
//       );
//       return response.data.coordinates;
//     } catch (error) {
//       console.error('Error getting coordinates:', error);
//       throw error;
//     }
//   };

//   // Helper function to update/create markers
//   const updateMarker = (type, coords, icon) => {
//     if (markersRef.current[type]) {
//       markersRef.current[type].setLatLng([coords.lat, coords.lon]);
//     } else {
//       markersRef.current[type] = L.marker([coords.lat, coords.lon], {
//         icon: L.divIcon({
//           html: `<div style="font-size: 24px;">${icon}</div>`,
//           className: 'custom-marker'
//         })
//       }).addTo(mapInstanceRef.current);
//     }
//   };

//   // Helper function to draw route
//   const drawRoute = async (start, end) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/maps/getdistancetime`, {
//           params: {
//             origin: `${start.lat},${start.lon}`,
//             destination: `${end.lat},${end.lon}`
//           },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         }
//       );

//       // Remove existing route layer if it exists
//       if (routeLayerRef.current) {
//         routeLayerRef.current.remove();
//       }

//       // Create new route layer
//       const routeCoordinates = response.data.coordinates.map(coord => [coord[1], coord[0]]);
//       routeLayerRef.current = L.polyline(routeCoordinates, {
//         color: 'blue',
//         weight: 4,
//         opacity: 0.7
//       }).addTo(mapInstanceRef.current);

//     } catch (error) {
//       console.error('Error drawing route:', error);
//     }
//   };

//   return (
//     <div 
//       ref={mapRef} 
//       style={{ 
//         height: '100%', 
//         width: '100%',
//         position: 'relative',
//         zIndex: [-1] 
//       }}
//     />
//   );
// };

// export default LiveTracking;