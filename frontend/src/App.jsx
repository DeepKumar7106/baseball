import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Game from "./pages/Game"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import Scoreboard from "./pages/Scoreboard"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home /> } />
        <Route path="/game" element= {<Game /> } />
        <Route path="/auth" element= {<Auth /> } />
        <Route path="/me" element={<Profile />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
      </Routes>
      
    </BrowserRouter>
    
  )
}

export default App
