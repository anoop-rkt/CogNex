import './index.css'
import React from 'react'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { ThemeProvider, createTheme } from '@mui/material'

axios.defaults.baseURL = "http://localhost:5000/api/v1"
axios.defaults.withCredentials = true
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Mono , serif",
    allVariants: { color: "white" }
  }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
