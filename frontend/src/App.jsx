import { Route , Routes} from "react-router-dom"
import SignupPage from "./pages/SignupPage"
const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App