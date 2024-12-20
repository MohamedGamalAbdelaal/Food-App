import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import './index.css'
import App from './App.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from './modules/Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <AuthContextProvider>
    <ToastContainer />
    <App />
    </AuthContextProvider>
  </StrictMode>,
)
