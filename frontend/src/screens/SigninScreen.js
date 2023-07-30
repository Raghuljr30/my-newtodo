import { useState } from "react";
import { Axios } from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { getError } from "../components/util";
import { Store } from "../Store";
import axios from "axios";
import { Link } from "react-router-dom";
import HomeScreen from "./HomeScreen";



export default function SigninScreen(){

  const navigate=useNavigate();
    
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
   
    const{state,dispatch:ctxdispatch}=useContext(Store);


    const submitHandler=async(e)=>{
      e.preventDefault();
      console.log("hi")
      
      console.log(password);

    
      try{

        console.log("hiAAA")
          const{data}= await axios.post('/api/users/signin',{
       
              email,
              password,
          });
          console.log(data);
          ctxdispatch({type:'USER_SIGNIN',payload:data})
          localStorage.setItem('userInfo',JSON.stringify(data));
        //   const [{name:name}]=data;
          navigate(`/homescreen/${data._id}`);
          
      }
      catch(err)
      {   
          toast.error(getError(err));
      }


  }

    return (
        <>
<div class="pt-20  px-56 ">

<div class="container mx-auto  px-4">


<form onSubmit={submitHandler}>

  

  <div class="mb-4">
    <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
    <input  onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Your Email" required />
  </div>

  <div class="mb-4">
    <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
    <input   onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Your Email" required />
  </div>



  <div class="mt-4">
    <button   type="submit" class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md">Submit</button>
  </div>
</form>

</div>

</div>

        </>


    )
    
}