import { useEffect, useState, useReducer } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-toastify';
import { getError } from "../components/util";
import { Store } from "../Store";
import { Link } from "react-router-dom";
import axios from "axios";
import ToDo from "../components/ToDo";


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


   


function HomeScreen()
{
  
    const[{loading,error,todo}, dispatch]=useReducer((reducer),{
        todo:[],
         loading:true,
         error:'',
     })

     const params=useParams();
     console.log(params);
     const{id}=params;


   const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")

  console.log(toDo);
     
  

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

 

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])
    



  const addToDo=async(text, setText, setToDo)=>{

    try{

          const{data}= await axios.post(`/api/tasks/${id}`,{
            
            text,
          });
          setText("");
          console.log(data);
          getAllToDo(setToDo)
          
      }
      catch(err)
      {   
          toast.error(getError(err));
      }

}


const updateToDo=async()=>{

  try{

    const{data}= await axios.post(`/api/tasks/update/${id}`,{
      
      toDoId,
      text,
    });
    setText("");
    setIsUpdating(false)
    console.log(data);
    getAllToDo(setToDo)
    
}
catch(err)
{   
    toast.error(getError(err));
}


}

const deleteToDo=async()=>{

  try{

    const{data}= await axios.post(`/api/tasks/${id}`,{
      
      id,
    });
   
    console.log(data);
    getAllToDo(setToDo)
    
}
catch(err)
{   
    toast.error(getError(err));
}

}

  

    return( 
        <>
          <div class="pt-10  px-56 ">

<div class="container mx-auto  px-4">
<div className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          </div>


          <div
            className="add"
            onClick={isUpdating ?
              () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
              : () => addToDo(text, setText, setToDo)}>
            {isUpdating ? "Update" : "Add"}
          </div>
</div>
</div>



<div className="list">

{toDo.map((item) => 
<ToDo 

key={item._id} 
text={item.task}
deleteToDo = {item._id}
updateMode={item._id}
setToDo={setToDo}
setText={setText}
setIsUpdating={setIsUpdating}
setToDoId={setToDoId}
id={id}
 />)}


</div>

   
        
        </>
    )
}

export default HomeScreen;