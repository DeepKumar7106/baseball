import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Game from "./pages/Game"
import Auth from "./pages/Auth"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home /> } />
        <Route path="/game" element= {<Game /> } />
        <Route path="/auth" element= {<Auth /> } />
      </Routes>
      
    </BrowserRouter>
    
  )
}

export default App
