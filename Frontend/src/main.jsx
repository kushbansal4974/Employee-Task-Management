import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>,
    <ToastContainer theme="dark" autoClose={2000} />
  </AuthProvider>
)
