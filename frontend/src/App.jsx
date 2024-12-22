import { Route , Routes} from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import AuthScreen from "./pages/home/AuthScreen"
import LoginPage from "./pages/login"
import HomeScreen from "./pages/home/HomeScreen"



const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/home" element={<HomeScreen/>}/>
          
          
        </Routes>
      </div>
    </>
  )
}

export default App