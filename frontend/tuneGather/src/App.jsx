import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Landing from './components/Landing'
import Calendar from './components/Calendar'
import Singin from './components/Singin'



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/singin' element={<Singin />} />
          <Route path='/login' element={<Login />} />


        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
