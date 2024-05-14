import React, { useContext } from 'react'
import {useEffect,useState} from 'react'
import axios from "axios"
import AuthContext from '../context/AuthContext'
axios.defaults.withCredentials=true

const Users = () => {
  const{user,setUser}=useContext(AuthContext)
  const sendRequest=async()=>{
    const response=await axios.get(`http://localhost:2602/api/user/`,{
      withCredentials:true
    })
    // console.log(response.data)
    const data =await response.data;
    // console.log(data.user.name)
    setUser(data.user)
  }
  useEffect(() => {
    sendRequest()
  }, [])
  
  return (
    <div className='flex justify-center items-center-h-[80vh]'>{
    user && <span className='text-xl font-bold'>Welcome {user.name}!</span>
    }</div>
  )
}

export default Users