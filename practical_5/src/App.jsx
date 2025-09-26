import { useState } from 'react'
import Calculator from './components/calculator'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Calculator />
      </div>
    </>
  )
}

export default App
