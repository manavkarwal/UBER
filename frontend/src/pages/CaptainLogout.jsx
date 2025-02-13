import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const tokenn = localStorage.getItem('tokenn');
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_API_URL}/captain/logout`,{
        headers:{
            Authorization: `Bearer ${tokenn}`
        }
    }).then((Response)=> {
        if (Response.status === 200){
            localStorage.removeItem('tokenn')
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
