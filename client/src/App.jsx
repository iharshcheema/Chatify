import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dm from './Components/Dm'
import Try from './Components/Room'
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dm />} />
        <Route path="/joinroom" element={<Try />} />
      </Routes>
    </>
  )
}

export default App
