/* eslint-disable react/prop-types */

import axios from 'axios';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { useDrag } from 'react-dnd';
import moment from 'moment/moment';
import { AuthContext } from './AuthProvider/AuthProvider';
const TaskCard = ({ task, refetch, isLoading }) => {
    const { user } = useContext(AuthContext)
    const [singleTask, setSingleTask] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
   

    // delete
    const handleDeleteOrder = async (id) => {
        try {
            const { data } = await axios.delete(`https://task-server-mocha-nine.vercel.app/tasks/${id}`)
            console.log(data)
            refetch()
            toast.success('Task deleted ')
        } catch (err) {
            // console.log(err)
            toast.error(err.message)
        }
    }
    const deleteConfirmation = (id) => {
        toast(t => (
            <div className='flex gap-3 items-center'>
                <div>
                    <p>Are you <b>sure?</b></p>
                </div>
                <div className='flex gap-2'>
                    <button
                        className='bg-red-400 text-white px-3 py-1 rounded-md'
                        onClick={() => {
                            toast.dismiss(t.id)
                            handleDeleteOrder(id)
                        }}
                    >Yes
                    </button>
                    <button className='bg-green-400 text-white px-3 py-1 rounded-md'
                        onClick={() => toast.dismiss(t.id)}
                    >Cancel</button>
                </div>
            </div>
        ))
    }

    // modal function
    const handleModal = async (id) => {
        try {
            const { data } = await axios.get(`https://task-server-mocha-nine.vercel.app/singleTasks/${id}`)
            setSingleTask(data)
            setIsModalOpen(true);
        } catch (err) {
            console.log(err)
            toast.error('failed to fetch task details')
        }
    }


   
    const handleUpdateTask = (e) => {
        e.preventDefault()

        if (user?.email !== singleTask.email) {
            return toast.error('invalid user')
        }
        const updatedTask = {
            title: e.target.title.value,
            description: e.target.description.value,
            category: e.target.category.value
        }
       

        axios.put(`https://task-server-mocha-nine.vercel.app/tasks/${singleTask._id}`, updatedTask)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    setIsModalOpen(false);
                    toast.success('Task Updated ')
                }
            })
    }
    
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
   

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div ref={drag} className={`${isDragging ? 'opacity-70' : 'opacity-100'} border shadow-md  p-2 rounded-sm flex justify-between items-start cursor-grab`}>
            <div>
                <h1 className='mb-2 text-xl font-semibold'>{task.title}</h1>
                <p>{task.description}</p>
                <p className='mt-3'>{moment(task.createdAt).format('L') }</p>
            </div>
            <div className='flex gap-3'>
                <button onClick={() => handleModal(task._id)} className='text-green-500 font-semibold text-xl'><FaRegEdit /></button>
                <button onClick={() => deleteConfirmation(task._id)} className='text-red-500 font-semibold text-xl'><RiDeleteBin6Fill /></button>
            </div>

            {/* modal */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {isModalOpen && singleTask && (
                <div className="fixed inset-0 flex items-center justify-center   bg-opacity-50">
                    <div className=" bg-slate-300  p-6 rounded-md shadow-md w-96">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Edit Task</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-red-500 text-2xl">
                                <MdCancelPresentation />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateTask} className="space-y-2 mt-4">
                            <label className="form-control w-full">
                                <span className="label-text">Task Title</span>
                                <input
                                    defaultValue={singleTask?.title}
                                    type="text"
                                    required
                                    name="title"
                                    placeholder="Write task title"
                                    className="input rounded-md input-bordered w-full p-2"
                                />
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text ">Description</span>
                                <textarea
                                    required
                                    defaultValue={singleTask?.description}
                                    name="description"
                                    placeholder="Write a short description"
                                    className="textarea rounded-md textarea-bordered w-full p-2"
                                ></textarea>
                            </label>

                            <label className="label">
                                <span className="label-text ">Task Category</span>
                            </label>
                            <select
                                required
                                defaultValue={singleTask.category}
                                name="category"
                                className="select rounded-md select-bordered w-full p-2"
                            >
                                <option disabled>Pick a task category</option>
                                <option>To-Do</option>
                                <option>In-Progress</option>
                                <option>Done</option>
                            </select>

                            <button className="btn border-none bg-blue-400 text-white font-semibold w-full p-2 mt-4">
                                Update Task
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCard;