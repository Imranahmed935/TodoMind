


import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const Task = () => {
  const [show, setShow] = useState(false);

  // State for form inputs
  const [taskValue, setTaskValue] = useState({
    task: "",
    description: "",
    time: new Date().toLocaleTimeString(),
    category: "",
  });

  // Handle form input changes
  const handleValue = (e) => {
    setTaskValue({ ...taskValue, [e.target.name]: e.target.value });
  };

  const { data: cards, refetch } = useQuery({
    queryKey: ["read"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/taskRead");
      return res.data;
    },
  });

  // Handle Add Task
  const handleAdd = async () => {
    setShow(false);
    setTaskValue({
      task: "",
      description: "",
      time: new Date().toLocaleTimeString(),
      category: "",
    });
    const res = await axios.post("http://localhost:5000/task", taskValue);
    if (res.data.insertedId) {
      refetch();
      toast.success("Task added");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(`http://localhost:5000/deleteTask/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="lg:w-10/12 mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border border-red-500 p-4 rounded">
          <h1 className="pb-4">To-do</h1>

          {cards?.map((item) => (
            <div key={item._id} className="border rounded-md flex justify-between mt-2 p-2">
              <div>
                <h1>{item.task}</h1>
                <p>{item.description}</p>
                <p>{item.time}</p>
                <p>{item.category}</p>
              </div>
              <div className="flex gap-4">
                <span className="cursor-pointer">
                  <FiEdit />
                </span>
                <span className="cursor-pointer" onClick={() => handleDelete(item._id)}>
                  <FaRegTrashCan />
                </span>
              </div>
            </div>
          ))}

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
                <button onClick={handleAdd} className="text-xl bg-teal-400 p-2 rounded">
                  Add
                </button>
                <button onClick={() => setShow(false)} className="text-xl text-red-600 hover:bg-gray-300 p-2 rounded">
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
        <div className="border border-blue-500 p-2 rounded ">In-Progress</div>
        <div className="border border-green-500 p-2 rounded">Done</div>
      </div>
    </div>
  );
};

export default Task;



