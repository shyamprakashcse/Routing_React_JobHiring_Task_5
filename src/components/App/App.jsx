import React from 'react'
import { Routes,Route } from 'react-router-dom'

import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import Job from "../Job/Job" 

function App() {
  return (
    <div> 
      <Navbar/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Job' element={<Job/>}/> 
          
       
       </Routes>
    </div>
  )
}

export default App