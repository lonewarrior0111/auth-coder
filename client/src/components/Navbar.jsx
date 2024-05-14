import React, { useContext, useState } from 'react'
import {Link} from "react-router-dom"
import AuthContext from '../context/AuthContext';
import axios from "axios"
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials=true

const Navbar = () => {
  const {isAuth,setIsAuth,setUser}=useContext(AuthContext)
  const navigate = useNavigate();

  const logoutUser = async () => {
    const res = await axios.post("http://localhost:2602/api/user/logout", null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    return new Error("Unable to logout user");
  };
  
  const handleLogout=async()=>{
    logoutUser()
    .then(() => {
      setIsAuth(false);
      setUser({});
      setTimeout(()=>{navigate(`/login`)},2000)
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className='flex flex-col lg:flex-row justify-between px-2 py-3 bg-purple-600 text-white'>
        <h2 className='font-bold text-2xl text-center'>MERN AUTHENTICATION AND AUTHORIZATION</h2>
        <div className='flex gap-5 justify-center mx-3'>
            <Link to='/' className='list-none cursor-pointer text-xl hover:text-black hover:text-2xl ease-in-out'>Home</Link>
            <Link to='/login' className={`${isAuth && "hidden"} && list-none cursor-pointer text-xl hover:text-black hover:text-2xl ease-in-out`}>Login</Link>
            <Link to='#'  onClick={handleLogout} className={`${!isAuth && "hidden"} && list-none cursor-pointer text-xl hover:text-black hover:text-2xl ease-in-out` }>Logout</Link>
            <Link to='/signup' className='list-none cursor-pointer text-xl hover:text-black hover:text-2xl ease-in-out'>SignUp</Link>
        </div>
    </div>
  );
}

export default Navbar