import { BrowserRouter, Routes, Route } from "react-router-dom"

import Welcome from "./pages/Welcome/Welcome"
import Onboarding from "./pages/Onboarding/Onboarding"
import Home from "./pages/Home/Home"
import Search from "./pages/Search/Search"
import Destination from "./pages/Destination/Destination"
import Navigation from "./pages/Navigation/Navigation"
import Arrival from "./pages/Arrival/Arrival"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/arrival" element={<Arrival />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App