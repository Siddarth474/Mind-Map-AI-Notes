import React, { useContext } from 'react'
import { FaBars } from "react-icons/fa6";
import { MindMapContext } from '../context/MindMapContext';

const Footer = () => {
  const {setShowInput, setToggle, nodes} = useContext(MindMapContext);

  return (
    <div className='h-[10%] bg-lime-500 p-4 flex justify-between items-center relative'>
        <h1 className='text-lg sm:text-2xl font-semibold'>Mind Map</h1>
        
        {nodes.length ? 
          <button onClick={() => setShowInput(true)} 
          className=' w-16 h-16 text-[45px] sm:w-[200px] sm:h-13 bg-black text-white sm:text-[40px] 
          left-1/2 -translate-x-1/2 -top-8 sm:-top-6 absolute font-bold rounded-full flex 
          justify-center items-center shadow-lg border-t-2 border-white cursor-pointer hover:bg-slate-800'> + </button>
        : null}

        <FaBars onClick={() => setToggle(true)} className='w-6 h-6 sm:mr-5 cursor-pointer' />
    </div>
  )
}

export default Footer