import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Task = () => {
  const [show, setShow] = useState(false);

  // State for form inputs
  const [taskValue, setTaskValue] = useState({
    task:'',
    description:"",
    time:new Date().toLocaleTimeString(),
    category:''
  })
  
  // Handle form input changes
  const handleValue = (e)=>{
    setTaskValue({...taskValue, [e.target.name]: e.target.value})
  } 
  
  // Handle Add Task
  const handleAdd = async() => {
    setShow(false)
    setTaskValue({task:'', description:'', time:new Date().toLocaleTimeString(), category:''}); 
    const res = await axios.post('http://localhost:5000/task', taskValue)
    if(res.data.insertedId){
      toast.success('task added')
    }
  };

  return (
    <div className="lg:w-10/12 mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border border-red-500 p-4 rounded">
          <h1 className="pb-4">To-do</h1>
              
          {show && (
            <div className="border p-1 rounded">
              <input
                name="task"
                className="p-2 w-full mt-2 mb-2 border outline-none rounded"
                type="text"
                placeholder="Enter a task"
                value={taskValue.task}
                onChange={handleValue}
               
              />
              <input
                name="description"
                className="p-2 w-full mt-2 mb-2 border outline-none rounded"
                type="text"
                placeholder="Description"
                value={taskValue.description}
                onChange={handleValue}
               
              />
              <input
                name="time"
                className="p-2 w-full mt-2 mb-2 border outline-none rounded"
                type="text"
                readOnly
                value={taskValue.time}
                onChange={handleValue}
                
              />
              <input
                name="category"
                className="p-2 w-full mt-2 mb-2 border outline-none rounded"
                type="text"
                placeholder="Category.."
                value={taskValue.category}
                onChange={handleValue}
                
              />

              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="text-xl bg-teal-400 p-2 rounded"
                >
                  Add
                </button>

                <button
                  onClick={() => setShow(false)}
                  className="text-xl text-red-600 hover:bg-gray-300 p-2 rounded"
                >
                  X
                </button>
              </div>
            </div>
          )}

          {!show && (
            <button
              onClick={() => setShow(true)}
              className="text-xl w-full border border-gray-200 hover:bg-gray-300 duration-300"
            >
              + Add Task
            </button>
          )}
        </div>
        <div className="border border-blue-500 p-2 rounded">In-Progress</div>
        <div className="border border-green-500 p-2 rounded">Done</div>
      </div>
    </div>
  );
};

export default Task;
