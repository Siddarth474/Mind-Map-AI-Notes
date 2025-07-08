import { Handle, Position } from '@xyflow/react';
import { motion } from "framer-motion";
import { useState, memo } from 'react';
import { FaTrash } from 'react-icons/fa';

const CustomNode = ({ data }) => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleDelete = () => {
    setVisible(false);
    setTimeout(() => {
      data.onDelete(data.id);
    }, 300);
  };

  return (
    <motion.div  
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className={`${data.id === '1' ? 'min-w-[150px] sm:min-w-[200px] max-w-[270px] bg-lime-500 p-5' 
      : 'min-w-[80px] sm:min-w-[100px] max-w-[150px] bg-white p-3 '} 
      h-auto relative rounded-md shadow-md border`}> 

      {hovered && (
        <button onClick={handleDelete}
          className="absolute top-1 right-1 text-black ease-in-out cursor-pointer" >
          <FaTrash size={14} />
        </button>
      )}
      <div className={`${data.id === '1' ? 'text-lg sm:text-2xl font-semibold capitalize' : 'text-[16px]'} text-center`}>{data.label}</div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} /> 
    </motion.div>
  );
};

export default memo(CustomNode);

