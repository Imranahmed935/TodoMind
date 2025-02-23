
import axios from 'axios';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { AuthContext } from './AuthProvider/AuthProvider';
import Column from './Column';
import CreateTask from './CreateTask';
import { useQuery } from '@tanstack/react-query';
const Board = () => {
  const { user } = useContext(AuthContext)
  const categories = ['To-Do', 'In-Progress', 'Done']
  // get all tasks
  const { data: tasks = [], refetch, isLoading } = useQuery({
    queryKey: ['tasks', user],
    queryFn: async () => {
      const { data } = await axios.get(`https://task-server-mocha-nine.vercel.app/tasks/${user?.email}`)
      return data
    },
    enabled: true
  })


  // add task
  const addTask = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value
    if (title.length > 50) return toast.error('Title must be less then or equal to 50 caharacter')
    if (description.length > 200) return toast.error('Description must be less then or equal to 200 caharacter')

    const newTask = {
      email: user?.email,
      title: title,
      description: description,
      createdAt: new Date(),
      category: 'To-Do'
    }
   

    await axios.post('https://task-server-mocha-nine.vercel.app/tasks', newTask)
      .then(() => {
       
        refetch()
        toast.success('Task Created')
        e.target.reset()
      })

  }
  return (
    <>
    <div className='lg:w-8/12 mx-auto mt-4 lg:ml-80'><CreateTask addTask={addTask}></CreateTask></div>
      <div className='px-10 lg:w-8/12 mx-auto'>  
          <DndProvider backend={HTML5Backend}>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>
            {
              categories.map((category, index) => <Column isLoading={isLoading} refetch={refetch} key={index} category={category} tasks={tasks}></Column>)
            }
           
          </div>
          </DndProvider>
          
      </div>
      </>
  );
};

export default Board;