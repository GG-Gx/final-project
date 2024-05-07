import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Landing from './components/Landing'
import Calendar from './components/Calendar'
import Singup from './components/Singup'
import SharedCalendar from './components/SharedCalendar'



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
          <Route path='/signup' element={<Singup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sharedcalendar' element={<SharedCalendar />} />


        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
