import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Landing from './components/Landing'
import Calendar from './components/Calendar'
import Singup from './components/Singup'
import SharedCalendar from './components/SharedCalendar'
import { AuthContext } from './context/AuthContext'


import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login'

function App() {
  const authContext = React.useContext(AuthContext);

  const user = authContext.auth.user;


  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path='/' element={user ? <Navigate to="/calendar" /> : <Landing />} />
          <Route path='/calendar' element={!user ? <Navigate to = '/'/> : <Calendar />   } />
          <Route path='/signup' element={user ? <Navigate to = '/calendar' /> : <Singup />  } />
          <Route path='/login' element={user ? <Navigate to = '/calendar' /> : <Login /> } />
          <Route path='/sharedcalendar' element={<SharedCalendar />} />


        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
