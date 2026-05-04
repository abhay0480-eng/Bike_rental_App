import { Navigate, useLocation, Outlet } from "react-router"
import { useAuth } from "../context/AuthContext"

export const ProtectedRoute = () => {
    const { user, loading } = useAuth()
    const location = useLocation()

    // Step 1: Wait for auth to finish checking
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#FFF7ED]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#FF8C38] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-lg font-semibold text-[#4D4D4D]">Checking authentication...</p>
                </div>
            </div>
        )
    }

    // Step 2: If no user, redirect to login and save where they tried to go
    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />
    }

    // Step 3: User is authenticated, show the protected content
    return <Outlet />
}