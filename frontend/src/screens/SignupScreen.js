import { useState } from "react";
import { Axios } from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { getError } from "../components/util";
import { Store } from "../Store";
import { Link } from "react-router-dom";
import axios from "axios";
import HomeScreen from "./HomeScreen";

export default function SignupScreen(){

  const navigate=useNavigate();
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');
    console.log(name);
    const{state,dispatch:ctxdispatch}=useContext(Store);
    const submitHandler=async(e)=>{
      e.preventDefault();
      console.log("hi")
      console.log(name);
      console.log(password);
      console.log(confirmPassword);
      if(password!==confirmPassword)
      {
          toast.error('Password do not match');
          return;
      }
      try{

        console.log("hiAAA")
          const{data}= await axios.post('/api/users/signup',{
              name,
              email,
              password,
          });
          console.log(data);
          ctxdispatch({type:'USER_SIGNIN',payload:data})
          localStorage.setItem('userInfo',JSON.stringify(data));

          navigate('/homescreen');
          
      }
      catch(err)
      {   
          toast.error(getError(err));
      }


  }

    return (
        <>

<div class="pt-20  px-56 ">

<div class="container mx-auto">
<form onSubmit={submitHandler}>

<div class="mb-4">
  <label for="name" class="block text-gray-700 font-semibold mb-2">Name</label>
  <input   onChange={(e)=>setName(e.target.value)} type="text" id="name" name="name" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Your Name" required />
</div>

<div class="mb-4">
  <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
  <input  onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Your Email" required />
</div>

<div class="mb-4">
  <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
  <input   onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Your Email" required />
</div>

<div class="mb-4">
  <label for="cpassword" class="block text-gray-700 font-semibold mb-2">Confirm Password</label>
  <input  onChange={(e)=>setConfirmPassword(e.target.value)} type="password" id="cpassword" name="cpassword" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Your Email" required />
</div>

      


<div class="mt-4">
  <button   type="submit" class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md">Submit</button>
</div>
</form>
<div class="mt-4">
    {/* <button   type="submit" class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md">Submit</button> */}

   <span>Already Have an Account <Link to="/signinscreen"><h3 class="text-emerald-700">Signin</h3></Link></span> 
  </div>
</div>
</div>
    







        </>


    )
    
}