import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainSignUp from './pages/CaptainSignUp'
import CaptainLogin from './pages/CaptainLogin'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'



function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignUp />} />
        <Route path='/Home' element={<UserProtectWrapper>
          <Home />
        </UserProtectWrapper>} />
        <Route path='/user/logout' element={<UserProtectWrapper>
          <UserLogout />
        </UserProtectWrapper>} />
        <Route path='/captain-home'element={<CaptainHome/>}></Route>
      </Routes>
     
    </div>
  )
}

export default App
