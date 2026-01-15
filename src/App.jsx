
import { Profiler, useState } from "react"
import Navbar from "./Navbar"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Body from "./body";
import Login  from "./Login";
import Profile from "./Profile";
function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/Login" element={<Login></Login>}> </Route>
      <Route path="/Profile" element={<Profile></Profile>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    
  </>
  )
}

export default App
