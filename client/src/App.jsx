import React, { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Users from './pages/Users.jsx'
import Navbar from './components/Navbar.jsx'
import AuthContext from './context/AuthContext.js'
const App = () => {

  const [isAuth,setIsAuth]=useState(false)
  const [user,setUser]=useState({})
  return (
    <AuthContext.Provider value={{isAuth,setIsAuth,user,setUser}}>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path="/users" element={<Users />} />
    </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App