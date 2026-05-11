import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router"
import { Layout } from './components/Layout.tsx'
const Host = lazy(() => import('./pages/Host').then(m => ({ default: m.Host })))
const Bikes = lazy(() => import('./pages/Bikes').then(m => ({ default: m.Bikes })))
const BikeDetail = lazy(() => import('./pages/BikeDetail').then(m => ({ default: m.BikeDetail })))
const Dashboard = lazy(() => import('./pages/host/Dashboard').then(m => ({ default: m.Dashboard })))
const HostBikes = lazy(() => import('./pages/host/HostBikes').then(m => ({ default: m.HostBikes })))
const HostDetailBikes = lazy(() => import('./pages/host/HostDetailBikes').then(m => ({ default: m.HostDetailBikes })))
const Reviews = lazy(() => import('./pages/host/Reviews').then(m => ({ default: m.Reviews })))
const Income = lazy(() => import('./pages/host/Income').then(m => ({ default: m.Income })))
const HostBikeDetail = lazy(() => import('./pages/host/HostBikeDetail').then(m => ({ default: m.HostBikeDetail })))
const HostBikePricing = lazy(() => import('./pages/host/HostBikePricing').then(m => ({ default: m.HostBikePricing })))
const HostBikePhotos = lazy(() => import('./pages/host/HostBikePhotos').then(m => ({ default: m.HostBikePhotos })))
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })))
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })))
const SignUp = lazy(() => import('./pages/SignUp').then(m => ({ default: m.SignUp })))
const About = lazy(() => import('./pages/About.tsx'))
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })))

import { auth } from './config/firebase'
import { ProtectedRoute } from "./components/ProtectedRoute.tsx"

const PageLoader = () => (
  <div className="flex justify-center items-center h-screen bg-[#FFF7ED]">
    <div className="w-10 h-10 border-4 border-[#FF8C38] border-t-transparent rounded-full animate-spin" />
  </div>
)


function App() {

  console.log("Firebase Auth initialized:", auth)

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}> 
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="bikes" element={<Bikes />} />
            <Route path="bikes/:id" element={<BikeDetail />} />
            <Route path="host" element={<ProtectedRoute />}>
              <Route path="" element={<Host />}>
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
          </Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
