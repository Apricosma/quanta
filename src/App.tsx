import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import { Index } from './components/Index'

function App() {
  
  return (
    <>
      <Index name="Jim" age={29}/>
    </>
  )
}

export default App
