import React, { useContext, useState} from 'react'
import { GiBrain } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { GiRobotAntennas } from "react-icons/gi";
import { MindMapContext } from '../context/MindMapContext';
import { getAISuggestions } from '../api/AiSuggestion';
import { FaSquareGithub } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

const Sidebar = ({theme, setTheme}) => {
    const {
      toggle, setToggle, topic, 
      addNode, nodes,
      suggestions, setSuggestions, 
      addedSuggestion , setAddedSuggestion
    } = useContext(MindMapContext);

    const [loading, setLoading] = useState(false);

    const handleSuggestion = async () => {
      if(!topic || !nodes.length) return;
      setLoading(true);
      const ideas = await getAISuggestions(topic);
      setSuggestions(ideas);
      setLoading(false);
    }

    const handleAddSuggestion = (e, item) => {
      const exist = nodes.some(n => n.data.label.toLowerCase() === item.toLowerCase());
      if(exist) return;

      addNode(e, item);
      setToggle(false);
      setAddedSuggestion(prev => [...prev, item.toLowerCase()]);
    }

  return (
    <>
      <div onClick={() => setToggle(false)}
      className={`fixed top-0 left-0 bg-black h-full w-full opacity-45 z-45
        ${toggle ? 'block' : 'hidden'}`}></div>
      <div className={`w-[300px] sm:w-[400px] fixed right-0 top-0 bg-lime-500 h-full transform z-60
            ${toggle ? 'translate-x-0' : 'translate-x-full'} 
            transition-transform duration-300 ease-in-out`}>
            <div className='h-[10%] flex items-center justify-between p-5'>
                <div className='flex items-center gap-2'>
                    <GiBrain className='h-7 w-7' />
                    <h1 className='text-xl sm:text-2xl font-semibold'>Mind Map</h1>
                </div>
                <FaXmark onClick={() => setToggle(false)} className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer' />
            </div>
            
            <div className='h-[10%] px-5 pt-3 border-t mb-2 flex items-center gap-2'>
                <GiRobotAntennas className='w-6 h-6' />
                <h1 className='text-lg sm:text-xl font-semibold'>AI Suggestions :</h1>
                <button onClick={handleSuggestion} className='bg-black py-1 px-4
                 text-lime-400 my-2 outline-0 rounded cursor-pointer hover:bg-slate-800'>ASK</button>
            </div>

            <div className='px-5 pb-3 h-[70%] overflow-y-auto'>
              <ul className='list-none'>
                {!nodes.length ? (
                  <p className="text-lg font-semibold">Enter topic for suggestion...</p>
                ) : loading ? (
                  <p className="text-lg font-semibold">Loading...</p>
                ) : null}
                
                  {suggestions.map((item, index) => (
                    ( !loading && item !== "" &&
                      <li key={index} onClick={(e) => handleAddSuggestion(e, item)} 
                      className='flex justify-between gap-2 items-center w-[80%] bg-white
                      mb-3 ml-3 rounded-md p-3 hover:scale-105 duration-200 ease-in-out cursor-pointer'>
                        <p className='font-semibold whitespace-normal flex-wrap'>{item.trim()}</p>
                        { addedSuggestion.includes(item.toLowerCase()) ? 
                          <FaCheck className='w-5 h-5 text-green-500'/>
                          : <FaPlus className='w-5 h-5'/>
                        }
                      </li>
                    )
                  ))}                   
              </ul>
            </div>
            
            <div className='h-[10%] flex items-center justify-between gap-3 p-5 border-t'>
                {
                  theme === 'dark' ? <FaMoon onClick={() => setTheme('light')} className='w-5 h-5 cursor-pointer' />
                  : <FiSun onClick={() => setTheme('dark')} className='w-6 h-6 cursor-pointer' />
                }
                <a href='https://github.com/Siddarth474' className='cursor-pointer'>
                  <FaSquareGithub className='w-7 h-7'/>
                </a>
            </div>
       </div>
    </>
  )
}

export default Sidebar