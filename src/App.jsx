import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Nodes from './components/Nodes'
import Sidebar from './components/Sidebar'

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <>
    <Nodes theme={theme}/>
    <Sidebar theme={theme} setTheme={setTheme}/>
    </>
  )
}

export default App
