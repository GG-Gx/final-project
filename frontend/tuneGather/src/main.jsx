import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CalendarContextProvider } from './context/CalendarContext'
import { AuthContextProvider } from './context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CalendarContextProvider>
        <App />
      </CalendarContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
