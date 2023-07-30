import React from 'react'
import { useEffect, useState, useReducer } from "react";
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import axios from "axios";
import {toast} from 'react-toastify';
import { getError } from "../components/util";
import { Store } from "../Store";
import { Link } from "react-router-dom";

const reducer=(state,action)=>{
    switch(action.type)
    {
        case 'FETCH_REQUEST':
            return{...state,loading:true};
        case 'FETCH_SUCCESS':
            return{...state,products:action.payload,loading:false};
        case 'FETCH_FAIL':
            return{...state,loading:false,error:action.payload};
        default:
            return state;
    }
}


const ToDo = ({setText,text, updateMode, deleteToDo,setToDo,id,setIsUpdating,setToDoId}) => {

    const[{loading,error,todo}, dispatch]=useReducer((reducer),{
        todo:[],
         loading:true,
         error:'',
     })
    const getAllToDo=async(setToDo)=>
  {

    
    try{
        const result=await axios.get(`/api/tasks/${id}`);
        dispatch({type:'FETCH_SUCCESS',payload:result.data});
        const {tasks}=result.data;
        setToDo(tasks);
    }
    catch(err)
    {
        dispatch({type:'FETCH_FAIL',payload:err.message});
    }
  }

  const onClickupdateMode = async(_) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(updateMode)
  }


    console.log(deleteToDo);
    console.log(setToDo);


     const onClickDelete=async()=>
    {
        console.log(deleteToDo);
        try{

            const{data}= await axios.post(`/api/tasks/delete/${id}`,{
              
              deleteToDo
            });
            console.log(data);
            getAllToDo(setToDo)
        }
        catch(err)
    {   
    toast.error(getError(err));
    }

    }
    console.log(text);
    return (
        <>
        <div class="pt-10  px-56 ">

<div class="container mx-auto  px-4">
{/* <div className="todo">
            {/* <div className="text">

        
</div> */}
<div class="flex flex-col w-full border-opacity-50">
  <div class="grid h-20 card bg-base-300 rounded-box place-items-center">{text}
  <div className="icons">
                <BiEdit className='icon' onClick={onClickupdateMode} />
                <AiFillDelete className='icon' onClick={onClickDelete} />
            </div>
  </div>
  
  </div>
  


        
        {/* <div class="chat chat-start">
  <div class="chat-bubble chat-bubble-primary">{text}</div>
            </div>
            <div className="icons">
                <BiEdit className='icon' onClick={onClickupdateMode} />
                <AiFillDelete className='icon' onClick={onClickDelete} />
            </div> */}
</div>
</div>



    
        </>
       
    )
}

export default ToDo