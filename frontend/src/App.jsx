// import React, { useEffect } from 'react';
import { Route , Routes} from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import AuthScreen from "./pages/home/AuthScreen"
import Orderlist from "./pages/orderList"
import HomeScreen from "./pages/home/HomeScreen"
import LoginPage from "./pages/login"
import Products from "./pages/products"
// import Stats from "./components/Stats"
import Statistics from "./pages/statistics"
import  { Toaster } from "react-hot-toast"; // Import Toaster
import AddDishPopup from "./components/AddDishPopup"

const App = () => {
  
  return (
    <>
      <div>
      <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/home" element={<HomeScreen />}/>
          <Route path="/list" element={<Orderlist />}/>
          <Route path="/product" element={<Products />}/>
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/specialdish" element={<AddDishPopup />} />
          
        </Routes>
      </div>
    </>
  )
}

export default App