import { BrowserRouter, Routes, Route } from "react-router"
import { Home } from './pages/Home.tsx'
import { Layout } from './components/Layout.tsx'
import { About } from "./pages/About.tsx"
import { Host } from "./pages/Host.tsx"
import { Bikes } from "./pages/Bikes.tsx"
import { BikeDetail } from "./pages/BikeDetail.tsx"


function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="host" element={<Host />} />
            <Route path="bikes" element={<Bikes />} />
            <Route path="bikes:id" element={<BikeDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
