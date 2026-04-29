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
import { HostBikeDetail } from "./pages/host/HostBikeDetail.tsx"
import { HostBikePricing } from "./pages/host/HostBikePricing.tsx"
import { HostBikePhotos } from "./pages/host/HostBikePhotos.tsx"


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
              <Route path="bikes" element={<HostBikes />} />
              <Route path="bikes/:id" element={<HostDetailBikes />} >
                <Route index element={<HostBikeDetail />} />
                <Route path="pricing" element={<HostBikePricing />} />
                <Route path="photos" element={<HostBikePhotos />} />
              </Route>
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
