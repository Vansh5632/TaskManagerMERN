import { useState, useEffect } from 'react';
import { FaCheck } from "react-icons/fa";
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (input.trim()) {
      try {
        const newTask = { text: input, completed: false };
        const response = await axios.post('http://localhost:5000/api/tasks', newTask);
        setTasks([...tasks, response.data]);
        setInput("");
      } catch (error) {
        console.error("Error submitting task:", error);
      }
    }
  };

  const handleComplete = async (index) => {
    const task = tasks[index];
    const updatedTask = { ...task, completed: !task.completed };

    try {
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updatedTask);
      const newTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
      setTasks(newTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (index) => {
    const task = tasks[index];

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className='flex items-start justify-center text-center bg-[#003049] w-screen h-screen pt-[100px]'>
      <div className='flex flex-col items-center bg-[#f77f00] w-[40%] min-h-fit p-7 rounded-lg text-center'>
        <h1 className='font-bold text-[50px] text-[#eae2b7] tracking-wide'>Task Manager</h1>
        <div className='flex p-5'>
          <input 
            type="text" 
            placeholder='eg: write code' 
            value={input} 
            onChange={handleChange} 
            className='bg-[#313131] mx-2 w-[300px] p-2 rounded-lg text-white'
          />
          <button 
            onClick={handleSubmit} 
            className='bg-[#fcbf49] text-white px-4 py-2 rounded-lg'
          >
            Submit
          </button>
        </div>
        <div className='w-full mt-5'>
          {tasks.map((task, index) => (
            <div key={index} className='flex items-center justify-between mb-2 border-t-2 border-b-2 border-[#003049] text-[30px]'>
              <button onClick={() => handleComplete(index)}>
                <FaCheck className='text-[#fcbf49]'/>
              </button>
              <p className={`text-[#eae2b7] ${task.completed ? 'line-through decoration-black' : ''}`}>
                {task.text}
              </p>
              <button className='text-[#eae2b7]' onClick={() => handleDelete(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
