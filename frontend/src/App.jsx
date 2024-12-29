import { Route , Routes} from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import AuthScreen from "./pages/home/AuthScreen"
import Orderlist from "./pages/orderList"
import HomeScreen from "./pages/home/HomeScreen"
import LoginPage from "./pages/login"
import Products from "./pages/products"
import toast, { Toaster } from "react-hot-toast"; // Import Toaster

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

          
          
        </Routes>
      </div>
    </>
  )
}

export default App