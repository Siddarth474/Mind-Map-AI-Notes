import React , {useContext, useState} from 'react'
import {ReactFlow, Background, Controls, MiniMap, addEdge} from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import Avatar_icon from '../assets/avatar2.png';
import { MindMapContext } from '../context/MindMapContext';
import InputPop from './InputPop';
import CustomNode from './CustomNode';

const Nodes = ({theme}) => {

    const {showInput, setShowInput, nodes, edges, setEdges, onNodesChange, onEdgesChange} = useContext(MindMapContext);

    const isMobile = window.innerWidth < 768;

    const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

    const nodeTypes = {
      custom: CustomNode,
    };
    
  return (
    <div className={`w-screen h-[91vh] ${theme === 'dark' ? 'bg-[#161A20]' : 'bg-white'} `}>    
      {nodes.length === 0 ? 
      <div onClick={() => setShowInput(true)} 
      className='fixed top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2
      flex flex-col justify-center items-center p-5 rounded-full bg-lime-500
      w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] hover:scale-105 duration-100'> 
        <img src={Avatar_icon} className='w-[90px] sm:w-[130px] ' />
        <h1 className='text-xl sm:text-2xl font-semibold uppercase'>Start</h1>
      </div> : <></>} 

      {showInput ? <InputPop /> : <></>} 

      {nodes.length > 0 ? 
        <ReactFlow
        nodes={nodes} 
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        panOnScroll
        zoomOnScroll
        zoomOnPinch
        panOnDrag >
          <Background color='#888' gap={19}/> 
          <Controls />     
            <MiniMap nodeColor={n => {
              if(n.id === '1') return 'red';
              return 'lime';
            }} zoomable pannable
              style={{
              height: isMobile ? 90 : 160,
              width: isMobile ? 140 : 200,
              bottom: 5,
              right: 0,
              backgroundColor : theme === 'dark' ?  "#121212" : 'gray',
              borderRadius: 5
              }} />
        </ReactFlow>
       : <></>}
    </div>
  )
}

export default Nodes