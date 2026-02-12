
import { Profiler, useState } from "react"
import Navbar from "./components/Navbar"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Body from "./components/Body";
import Login  from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
       <Route index element={<Feed />} />      {/* FEED */}
      <Route path="/Login" element={<Login></Login>}> </Route>
      <Route path="/Profile" element={<Profile></Profile>}></Route>
      <Route path="/Connections" element={<Connections></Connections>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  </>
  )
}

export default App
