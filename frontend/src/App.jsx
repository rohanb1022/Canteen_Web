import { Route , Routes} from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import AuthScreen from "./pages/home/AuthScreen"
import Orderlist from "./pages/Orderlist"
const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App