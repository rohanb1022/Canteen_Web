import { Route , Routes} from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import AuthScreen from "./pages/home/AuthScreen"
import Orderlist from "./pages/orderList"
import HomeScreen from "./pages/home/HomeScreen"
import LoginPage from "./pages/login"
const App = () => {
  return (
    <>
      <div>
        
        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/home" element={<HomeScreen />}/>
          <Route path="/list" element={<Orderlist />}/>
          
          
        </Routes>
      </div>
    </>
  )
}

export default App