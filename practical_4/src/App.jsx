import { useState } from 'react'
import React from 'react'
import Counter from './components/Counter'
import Name from './components/Name'
import './App.css'
import HookCount from './components/HookCount'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='main-container'>
      {/* <Counter /> */}
      {/* <Name /> */}
      <HookCount />
    </div>
  )
}

export default App
