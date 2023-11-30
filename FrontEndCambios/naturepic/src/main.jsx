import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import DataProvider from './Components/Context/DataContext.jsx'
import { AuthProvider } from './Components/Context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <AuthProvider>
    <DataProvider>
    <App />
    </DataProvider>
    </AuthProvider>
  </BrowserRouter>

)
