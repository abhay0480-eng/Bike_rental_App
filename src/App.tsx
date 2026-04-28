import { BrowserRouter, Routes, Route } from "react-router"
import { Home } from './pages/Home.tsx'
import { Layout } from './components/Layout.tsx'
import { About } from "./pages/About.tsx"
import { Host } from "./pages/Host.tsx"
import { Bikes } from "./pages/Bikes.tsx"
import { BikeDetail } from "./pages/BikeDetail.tsx"
import { Dashboard } from "./pages/host/Dashboard.tsx"
import { HostBikes } from "./pages/host/HostBikes.tsx"
import { HostDetailBikes } from "./pages/host/HostDetailBikes.tsx"
import { Reviews } from "./pages/host/Reviews.tsx"
import { Income } from "./pages/host/Income.tsx"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="bikes" element={<Bikes />} />
            <Route path="bikes/:id" element={<BikeDetail />} />
            <Route path="host" element={<Host />}>
              <Route index element={<Dashboard />} />
              <Route path="hostBikes" element={<HostBikes />} />
              <Route path="hostBikes/:id" element={<HostDetailBikes />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="income" element={<Income />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
