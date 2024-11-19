import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from "./Login"
import Dashboard from './Dashboard'
import Signup from './Signup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>

    </div>
  )
}

export default App