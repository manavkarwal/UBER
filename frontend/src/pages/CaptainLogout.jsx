import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_API_URL}/captain/logout`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((Response)=> {
        if (Response.status === 200){
            localStorage.removeItem('token')
            navigate('/login')
        }
    })
  return (
    <div>
      CaptainLogout
    </div>
  )
}

export default CaptainLogout
