import { useState } from 'react'
import './App.css'
import Practical_1 from './components/Practical_1'
import Demo1 from './components/Demo1'
import Demo2 from './components/Demo2'
import StateDemo from './components/StateDemo'
import Counter from './components/Counter'
import Counter_5 from './components/Counter_5'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Practical_1 />
      </div>
      {/* <Demo1 dept = "CSE" institute = "CSPIT"> 
        <button>ACTION</button>
      </Demo1> */}
      {/* <Demo1 dept = "CE" institute = "CSPIT"/>
      <Demo2 dept = "IT" institute = "KDPIT"/> */}
      {/* <StateDemo /> */}
      {/* <Counter /> */}
      {/* <Counter_5 /> */}
    </>
  )
}

export default App
