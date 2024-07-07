import React, { useState } from 'react';
import { FaCheck } from "react-icons/fa";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const handleComplete = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
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
