import { useState } from 'react'
import './App.css'
import { PrintPage } from './Pages/PrintPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <PrintPage/>
    </div>
  )
}

export default App
