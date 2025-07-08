import { useNodesState , useEdgesState} from '@xyflow/react';
import React, {createContext,useEffect,useState} from 'react';

export const MindMapContext = createContext();

const MindMapProvider = ({children}) => {
  
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [toggle, setToggle] = useState(false);
  const [topic, setTopic] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [addedSuggestion , setAddedSuggestion] = useState([]);

  const addEdge = (sourceId, targetId) => {
    setEdges((prevEdges) => {
      const edgeId = `e-${sourceId}-${targetId}`;
      const alreadyExists = prevEdges.some(
        (edge) => edge.source === sourceId && edge.target === targetId
      );

      if (alreadyExists) return prevEdges;

      const newEdge = {
        id: edgeId,
        source: sourceId,
        target: targetId,
        type: 'straight',
      };

      return [...prevEdges, newEdge];
    });
  };


  const getRadialPositonNode = (index, nodesPerRing, centerX, centerY, baseRadius) => {
    const ring = Math.floor(index / nodesPerRing);
    const angle = (2 * Math.PI / nodesPerRing) * (index % nodesPerRing);
    const radius = baseRadius + ring * 150;

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return {x, y};
  }

  const handleDeleteAllNode = () => {
    setNodes([]);
    setEdges([]);
    setTopic([]);
    localStorage.removeItem('nodes');
    localStorage.removeItem('edges');
    localStorage.removeItem('suggestion');
    localStorage.removeItem('added');
  }

  const handleDeleteNode = (id) => {
  if (id === '1') {
    handleDeleteAllNode();
  } else {
    setNodes((prev) => {
      const deletedNode = prev.find(node => node.id === id);

      if (
        deletedNode &&
        suggestions.some(s => s.toLowerCase() === deletedNode.data.label.toLowerCase())
      ) {
        setAddedSuggestion(prev =>
          prev.filter(item =>
            item.toLowerCase() !== deletedNode.data.label.toLowerCase()
          )
        );
      }

      return prev.filter(node => node.id !== id);
    });

    setEdges(prev =>
      prev.filter(edge => edge.source !== id && edge.target !== id)
    );
  }
};


  const addNode = (e,topic) => { 
    e.preventDefault();
    if(topic.trim() === '') return ;

    const nodeWidth = 200;
    const nodeHeight = 60;

    const centerX = window.innerWidth / 2 - nodeWidth / 2;
    const centerY = window.innerHeight / 2 - nodeHeight / 2;
    const pos = getRadialPositonNode(nodes.length-1, 6, centerX, centerY, 250);

    const Id = (nodes.length + 1).toString();
    const exist = nodes.some(n => n.data.label.toLowerCase() === topic.toLowerCase());

    if(!exist) {
      setNodes((n) => [
        ...n,
        {
          id: Id,
          type: 'custom',
          data: {
            label: topic,
            id: Id,
            onDelete: handleDeleteNode,
          },
          position : { 
            x: !nodes.length ? centerX : pos.x ,
            y: !nodes.length ? centerY : pos.y 
          },
        },
      ]);
    }

    if(!nodes.length) setTopic(name);
    addEdge('1' , Id);
    setShowInput(false);
    setName('');
  } 

  useEffect(() => { 
    const storedNode = localStorage.getItem('node');
    const storedEdge = localStorage.getItem('edge');
    if(storedEdge && storedNode) {
      const parsedNodes = JSON.parse(storedNode).map((node) => ({
        ...node , 
        data : {
          ...node.data , 
          onDelete : handleDeleteNode
        }
      }));
      setNodes(parsedNodes);
      setEdges(JSON.parse(storedEdge));      
    }
    setIsInitialized(true);
  } , []);

  useEffect(() => {
    if(isInitialized) {
      localStorage.setItem('node' , JSON.stringify(nodes));
      localStorage.setItem('edge' , JSON.stringify(edges));
    }
  } , [isInitialized, nodes, edges]);


  //suggestion & addedSuggestion
  useEffect(() => {
    try {
      const storedSuggestion = localStorage.getItem('suggestion');
      const storedAddedSuggestion = localStorage.getItem('added');

      if (storedSuggestion) {
        setSuggestions(JSON.parse(storedSuggestion));
      }

      if (storedAddedSuggestion) {
        setAddedSuggestion(JSON.parse(storedAddedSuggestion));
      }
    } catch (err) {
      console.error("Failed to load from localStorage", err);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('suggestion', JSON.stringify(suggestions));
      localStorage.setItem('added', JSON.stringify(addedSuggestion));
    }
  }, [isInitialized, suggestions, addedSuggestion]);

  useEffect(() => {
    if (isInitialized && nodes.length === 0 && (suggestions.length || addedSuggestion.length)) {
      setSuggestions([]);
      setAddedSuggestion([]);
      localStorage.removeItem('suggestion');
      localStorage.removeItem('added');
    }
  }, [isInitialized, nodes]);


  
  const contextValue = {
      showInput, setShowInput,
      name, setName,
      nodes, setNodes, onNodesChange,
      edges, setEdges, onEdgesChange,
      toggle, setToggle ,
      topic, setTopic , addNode ,
      suggestions, setSuggestions,
      addedSuggestion, setAddedSuggestion
  }

  return (
    <MindMapContext.Provider value={contextValue}>
        {children}
    </MindMapContext.Provider>
  );
}

export default MindMapProvider;
