import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/auth/login"
import Register from "./components/auth/register"
import Home from "./components/home/Home"
import Game from "./components/pages/Game"
import History from "./components/pages/History"
import Navbar from "./components/utils/navbar"


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element= {<Home /> } />
        <Route path="/game" element= {<Game /> } />
        <Route path="/history" element= {<History /> } />
        <Route path="/login" element= {<Login /> } />
        <Route path="/register" element= {<Register /> } />
      </Routes>
      
    </BrowserRouter>
    
  )
}

export default App
