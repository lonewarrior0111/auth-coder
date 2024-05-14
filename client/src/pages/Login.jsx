import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  
  const [loading, setLoading] = useState(false);
  const[flag,setFlag]=useState(false)
  const navigate = useNavigate();
  const{setIsAuth}=useContext(AuthContext)

  const handleLogin=async(e)=>{
    e.preventDefault()
    setLoading(true);
    try{
      const response=await axios.post(`http://localhost:2602/api/user/login`,{
        email,
        password,
      })
      const data=await response.data
      setIsAuth(true)
      setLoading(false);
      // console.log(data)
      alert(data.message);
      setTimeout(()=>{navigate(`/users`)},2000) 
      // navigate("/users");
    }catch(error){
      console.log(error)
      // alert(error.response.message)
      setLoading(false);
    }
  }
  return (
    <div className='flex flex-col gap-3 rounded-md shadow-md w-fit p-3 mx-auto my-[30vh]'>
      <input type="email" name="email" id="email" placeholder='Enter your email' 
       value={email}
       onChange={(e) => setEmail(e.target.value)} className='px-2 border-2 rounded-lg py-2 border-purple-100 transition-all-delay-100 w-[300px] ease-in-out focus:border-purple-500 outline-none'/>
      <input type="password" name="password" id="password" placeholder='Enter your password'  value={password}
       onChange={(e) => setPassword(e.target.value)} className='px-2 border-2 rounded-lg py-2 border-purple-100 transition-all-delay-100 w-[300px] ease-in-out focus:border-purple-500 outline-none'/>
      <button type='submit' onClick={handleLogin} className='bg-purple-500 px-3 py-2 rounded-full text-white shadow-md  hover:bg-purple-700'>Login</button>
      <p>Don't have an account? <Link to='/signup'><span className='text-purple-500 text-bold'>SignUp</span></Link></p>
    </div>
  )
}

export default Login