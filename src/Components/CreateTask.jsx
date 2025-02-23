/* eslint-disable react/prop-types */

import { useState } from "react";

const CreateTask = ({ addTask }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {show && (
        <div className="mt-8 max-w-sm border p-2 rounded">
          <form action="" onSubmit={addTask}>
            <input
              type="text"
              name="title"
              placeholder="Task title"
              className="w-full mb-2 p-2  border rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <button className="bg-blue-400 text-white px-4 py-2 rounded">
              Add 
            </button>
            <button onClick={()=>setShow(false)} className=" text-red-600 px-4 py-2 rounded">
                X 
            </button>
          </form>
        </div>
      )}

      {
        !show && <button onClick={()=>setShow(true)} className="bg-blue-400 text-white px-4 py-2 rounded">
        + Add Task
       </button>
      }
    </>
  );
};

export default CreateTask;
