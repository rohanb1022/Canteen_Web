import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Orderlist from './pages/orderList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Orderlist />
   
   {/* <BrowserRouter>
    <App />
    </BrowserRouter> */}
  </StrictMode>,
)
