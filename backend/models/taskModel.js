import mongoose from 'mongoose';

const taskSchema=new mongoose.Schema(
    {
       
        task:{
            type:String,
            
        },
        
       
    },
    {
        timestamps:true
    }
);

const Task=mongoose.model('Task',taskSchema);
export default Task;