import React, { useContext } from 'react'
import { FaXmark } from "react-icons/fa6";
import { MindMapContext } from '../context/MindMapContext';

const InputPop = () => {
  const {setShowInput, name, setName, nodes, addNode} = useContext(MindMapContext);
  
  return (
    <>
      <div className='fixed top-0 left-0 bg-black h-full w-full opacity-45 z-45'></div>
      <div className='fixed top-[35%] left-1/2 transform -translate-x-1/2
       bg-lime-500 p-5 z-55 rounded-lg'>

        <h1 className='text-lg sm:text-xl font-semibold mb-3'>{nodes.length ? 'Your Thoughts' : 'Your Topic'}</h1>

          <form onSubmit={(e) => addNode(e, name)} className='flex gap-2'>
            <input type='text' value={name} onChange={(e) => setName(e.target.value) }
            placeholder={nodes.length ? 'Enter thought...' : 'Enter topic name...'} 
            className='bg-white p-2 rounded-md outline-0' />
            <button type='submit' className='bg-black text-white font-semibold
             py-2 px-3 rounded-md cursor-pointer'>Add</button>
          </form>

          <FaXmark onClick={() => setShowInput(false)} className='fixed top-2 right-2 w-5 h-5 cursor-pointer' />
      </div>  
    </>
  )
}

export default InputPop