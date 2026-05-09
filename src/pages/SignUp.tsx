import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router"
import { Bike, Eye, EyeOff, Mail, Lock, User, Phone, MapPin } from "lucide-react"

type FormErrors = {
    email?: string
    password?: string
    confirmPassword?: string
    fullName?: string
    phone?: string
    city?: string
    role?: string
}

type UserRole = "host" | "renter"

export const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        phone: "",
        role: "" as UserRole | "",
        city: ""
    })
    const [error, setError] = useState<FormErrors>({})
    const [isLoading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { signup, authError, clearAuthError } = useAuth()
    const navigate = useNavigate()

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

        // Clear field-specific error
        if (error[name as keyof FormErrors]) {
            setError(prev => {
                const newErrors = { ...prev }
                delete newErrors[name as keyof FormErrors]
                return newErrors
            })
        }
        if (authError) clearAuthError()
    }

    const handleRoleChange = (role: UserRole) => {
        setFormData(prev => ({ ...prev, role }))
        if (error.role) {
            setError(prev => {
                const newErrors = { ...prev }
                delete newErrors.role
                return newErrors
            })
        }
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match"
        }

        // Full name validation
        if (!formData.fullName) {
            newErrors.fullName = "Full name is required"
        }

        // Phone validation
        if (!formData.phone) {
            newErrors.phone = "Phone number is required"
        }

        // Role validation
        if (!formData.role) {
            newErrors.role = "Please select whether you're a host or renter"
        }

        // City validation (only for hosts)
        if (formData.role === "host" && !formData.city) {
            newErrors.city = "City is required for hosts"
        }

        setError(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validate form
        if (!validateForm()) return

        setLoading(true)

        try {
        // Step 1: Create Firebase user
        console.log('🔵 Step 1: Creating Firebase user...')
        const success = await signup(formData.email, formData.password)

        if (!success) {
            console.log('❌ Firebase signup failed')
            setLoading(false)
            return
        }

        console.log('✅ Step 1: Firebase user created')

        // Step 2: Get Firebase token
        console.log('🔵 Step 2: Getting Firebase token...')
        const { auth } = await import('../config/firebase')

        // Wait for Firebase to update currentUser
        await new Promise(resolve => setTimeout(resolve, 500))

        const user = auth.currentUser

        if (!user) {
            console.log('❌ No current user found')
            throw new Error('User not authenticated')
        }

        console.log('✅ Step 2: User authenticated, getting token...')
        const token = await user.getIdToken()
        console.log('✅ Token obtained')

        // Step 3: Call backend to save user profile
        console.log('🔵 Step 3: Saving user profile to backend...')
        const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
        console.log('📡 Backend URL:', BASE_URL)

        const response = await fetch(`${BASE_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                role: formData.role,
                fullName: formData.fullName,
                phone: formData.phone,
                city: formData.city || null
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.log('❌ Backend error:', errorData)
            throw new Error(errorData.error || 'Failed to create user profile')
        }

        const userData = await response.json()
        console.log('✅ User profile created:', userData)

        // Step 4: Redirect based on role
        console.log('🔵 Step 4: Redirecting based on role:', formData.role)
        if (formData.role === 'host') {
            navigate('/host', { replace: true })
        } else {
            navigate('/bikes', { replace: true })
        }

    } catch (error: any) {
        console.error('❌ Signup error:', error)
        setError({ email: error.message || 'Signup failed. Please try again.' })
    } finally {
        setLoading(false)
    }
    }

    return (
        <div className="flex items-center justify-center px-4 min-h-[calc(100vh-130px)] py-8">
            <div className="w-full max-w-[480px]">

                {/* Brand */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center bg-[#FF8C38] rounded-xl p-2.5 mb-3 shadow-[0_4px_14px_rgba(255,140,56,0.35)]">
                        <Bike className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-[22px] font-extrabold text-slate-900 m-0 tracking-[-0.4px]">
                        Create your Vrooom account
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Join the community of riders and hosts
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-7">

                    {/* Auth error */}
                    {authError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5 text-red-600 text-[13px] flex items-center gap-2 mb-4">
                            <span>⚠️</span> {authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

                        {/* Full Name */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] pointer-events-none ${error.fullName ? "text-red-500" : "text-slate-400"}`} />
                                <input
                                    id="signup-fullname"
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    placeholder="Abhay Kumar"
                                    onChange={handleInput}
                                    disabled={isLoading}
                                    className={`w-full py-[11px] pl-[42px] pr-4 rounded-[10px] text-sm border-[1.5px] outline-none transition-all duration-200 ${error.fullName
                                        ? "border-red-300 bg-red-50 text-slate-900 focus:bg-white"
                                        : "border-slate-200 bg-slate-50 text-slate-900 focus:border-[#FF8C38] focus:ring-[3px] focus:ring-[#FF8C38]/15 focus:bg-white"
                                        }`}
                                />
                            </div>
                            {error.fullName && (
                                <p className="text-red-500 text-[11px] mt-1 font-medium">{error.fullName}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] pointer-events-none ${error.email ? "text-red-500" : "text-slate-400"}`} />
                                <input
                                    id="signup-email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="you@example.com"
                                    onChange={handleInput}
                                    disabled={isLoading}
                                    className={`w-full py-[11px] pl-[42px] pr-4 rounded-[10px] text-sm border-[1.5px] outline-none transition-all duration-200 ${error.email
                                        ? "border-red-300 bg-red-50 text-slate-900 focus:bg-white"
                                        : "border-slate-200 bg-slate-50 text-slate-900 focus:border-[#FF8C38] focus:ring-[3px] focus:ring-[#FF8C38]/15 focus:bg-white"
                                        }`}
                                />
                            </div>
                            {error.email && (
                                <p className="text-red-500 text-[11px] mt-1 font-medium">{error.email}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] pointer-events-none ${error.phone ? "text-red-500" : "text-slate-400"}`} />
                                <input
                                    id="signup-phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    placeholder="+91 98765 43210"
                                    onChange={handleInput}
                                    disabled={isLoading}
                                    className={`w-full py-[11px] pl-[42px] pr-4 rounded-[10px] text-sm border-[1.5px] outline-none transition-all duration-200 ${error.phone
                                        ? "border-red-300 bg-red-50 text-slate-900 focus:bg-white"
                                        : "border-slate-200 bg-slate-50 text-slate-900 focus:border-[#FF8C38] focus:ring-[3px] focus:ring-[#FF8C38]/15 focus:bg-white"
                                        }`}
                                />
                            </div>
                            {error.phone && (
                                <p className="text-red-500 text-[11px] mt-1 font-medium">{error.phone}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] pointer-events-none ${error.password ? "text-red-500" : "text-slate-400"}`} />
                                <input
                                    id="signup-password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    placeholder="At least 6 characters"
                                    onChange={handleInput}
                                    disabled={isLoading}
                                    className={`w-full py-[11px] pl-[42px] pr-[42px] rounded-[10px] text-sm border-[1.5px] outline-none transition-all duration-200 ${error.password
                                        ? "border-red-300 bg-red-50 text-slate-900 focus:bg-white"
                                        : "border-slate-200 bg-slate-50 text-slate-900 focus:border-[#FF8C38] focus:ring-[3px] focus:ring-[#FF8C38]/15 focus:bg-white"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(p => !p)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none p-0.5 cursor-pointer text-slate-400 flex items-center hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-[15px] h-[15px]" /> : <Eye className="w-[15px] h-[15px]" />}
                                </button>
                            </div>
                            {error.password && (
                                <p className="text-red-500 text-[11px] mt-1 font-medium">{error.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] pointer-events-none ${error.confirmPassword ? "text-red-500" : "text-slate-400"}`} />
                                <input
                                    id="signup-confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    placeholder="Re-enter your password"
                                    onChange={handleInput}
                                    disabled={isLoading}
                                    className={`w-full py-[11px] pl-[42px] pr-[42px] rounded-[10px] text-sm border-[1.5px] outline-none transition-all duration-200 ${error.confirmPassword
                                        ? "border-red-300 bg-red-50 text-slate-900 focus:bg-white"
                                        : "border-slate-200 bg-slate-50 text-slate-900 focus:border-[#FF8C38] focus:ring-[3px] focus:ring-[#FF8C38]/15 focus:bg-white"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(p => !p)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none p-0.5 cursor-pointer text-slate-400 flex items-center hover:text-slate-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-[15px] h-[15px]" /> : <Eye className="w-[15px] h-[15px]" />}
                                </button>
                            </div>
                            {error.confirmPassword && (
                                <p className="text-red-500 text-[11px] mt-1 font-medium">{error.confirmPassword}</p>
                            )}
                        </div>

                        {/* User Type Selection */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2">
                                I want to
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleRoleChange("renter")}
                                    className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${formData.role === "renter"
                                        ? "border-[#FF8C38] bg-orange-50 text-[#FF8C38]"
                                        : error.role
                                            ? "border-red-300 bg-red-50 text-slate-600"
                                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                        }`}
                                >
                                    Rent a Bike
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRoleChange("host")}
                                    className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${formData.role === "host"
                                        ? "border-[#FF8C38] bg-orange-50 text-[#FF8C38]"
                                        : error.role
                                            ? "border-red-300 bg-red-50 text-slate-600"
                                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                        }`}
                                >
                                    Host my Bike
                                </button>
                            </div>
                            {error.role && (
                                <p className="text-red-500 text-[11px] mt-1.5 font-medium">{error.role}</p>
                            )}
                        </div>

                        {/* City (only for hosts) */}
                        {formData.role === "host" && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    City (where you'll host)
                                </label>
                                <div className="relative">
                                    <MapPin className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] pointer-events-none ${error.city ? "text-red-500" : "text-slate-400"}`} />
                                    <input
                                        id="signup-city"
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        placeholder="e.g. Mumbai, Delhi, Bangalore"
                                        onChange={handleInput}
                                        disabled={isLoading}
                                        className={`w-full py-[11px] pl-[42px] pr-4 rounded-[10px] text-sm border-[1.5px] outline-none transition-all duration-200 ${error.city
                                            ? "border-red-300 bg-red-50 text-slate-900 focus:bg-white"
                                            : "border-slate-200 bg-slate-50 text-slate-900 focus:border-[#FF8C38] focus:ring-[3px] focus:ring-[#FF8C38]/15 focus:bg-white"
                                            }`}
                                    />
                                </div>
                                {error.city && (
                                    <p className="text-red-500 text-[11px] mt-1 font-medium">{error.city}</p>
                                )}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            id="signup-submit-btn"
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-[13px] mt-2 rounded-[10px] border-none text-white text-[14px] font-bold flex items-center justify-center gap-2 transition-all duration-200 ${isLoading
                                ? "bg-orange-300 cursor-not-allowed shadow-none"
                                : "bg-gradient-to-br from-[#FF8C38] to-[#FF6B00] cursor-pointer shadow-[0_4px_14px_rgba(255,140,56,0.35)] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(255,140,56,0.45)]"
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                    Creating account…
                                </>
                            ) : "Create Account →"}
                        </button>
                    </form>
                </div>

                {/* Login link */}
                <p className="text-center mt-4 text-[13px] text-slate-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#FF8C38] font-bold no-underline hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}