import { onAuthStateChanged, type User } from "firebase/auth"
import { authService } from "../service/auth.service";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../config/firebase";



interface AuthContextType {
    user: User | null
    loading: boolean
    authError: string | null
    clearAuthError: () => void
    signup: (email: string, password: string) => Promise<boolean>
    login: (email: string, password: string) => Promise<boolean>
    logout: () => Promise<boolean>
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)


export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be use within an Auth Provider')
    }
    return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [authError, setAuthError] = useState<string | null>(null)

    const clearAuthError = () => setAuthError(null)

    const login = async (email: string, password: string) => {
        setAuthError(null)
        const result = await authService.loginWithEmail(email, password)

        if (!result.success) {
            setAuthError(result.error || 'Login failed')
            return false
        }
        return true
    }

    const signup = async (email: string, password: string) => {
        setAuthError(null)
        const result = await authService.signupWithEmail(email, password)

        if (!result.success) {
            setAuthError(result.error || 'Signup failed')
            return false
        }
        return true
    }

    const logout = async () => {
        setAuthError(null)
        const result = await authService.logout()

        if (!result.success) {
            setAuthError(result.error || 'Logout failed')
            return false
        }
        return true
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value: AuthContextType = {
        user,
        loading,
        authError,
        clearAuthError,  
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}