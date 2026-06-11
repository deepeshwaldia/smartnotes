import React, { useEffect } from 'react'
import {Navigate, Route ,Routes} from 'react-router-dom'
import Home from './pages/home'
import Auth from './pages/Autentication'
import { getCurrentUser } from './services/api.js'
import { useDispatch, useSelector } from 'react-redux'
export const ServerUrl="http://localhost:8000"
import History from './pages/history'
import Notes from './pages/notes'
import Pricing from './pages/pricing'
const App = () => {
  const dispatch =useDispatch()
  useEffect(()=>{
    getCurrentUser(dispatch)
  },[dispatch])

  const {userData}=useSelector((state)=>state.user)
  console.log(userData)
  return (
   <>
   <Routes>
    <Route path='/' element={userData?<Home/>:<Navigate to="/auth" replace />}/>
      <Route path='/auth' element={userData ? <Navigate to="/" replace /> : <Auth />}/>

       <Route path='/history' element={userData?<History/>:<Navigate to="/auth" replace />}/>

        <Route path='/notes' element={userData?<Notes/>:<Navigate to="/auth" replace />}/>
         <Route path='/pricing' element={userData?<Pricing/>:<Navigate to="/auth" replace />}/>

   </Routes>
   </>
  )
}

export default App
