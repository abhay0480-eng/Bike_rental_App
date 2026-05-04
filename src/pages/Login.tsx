import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, useLocation, Link } from "react-router"
import { Bike, Eye, EyeOff, Mail, Lock } from "lucide-react"

type FormErrors = {
    email?: string
    password?: string
}

export const Login = () => {
    const [formData, setFormData] = useState({ email: "test@test.com", password: "123456" })
    const [error, setError] = useState<FormErrors>({})
    const [isLoading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { login, authError, clearAuthError } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || "/host"

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        if (error[e.target.name as keyof FormErrors]) {
            setError(prev => { const n = { ...prev }; delete n[e.target.name as keyof FormErrors]; return n })
        }
        if (authError) clearAuthError()
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError({})
        const newErrors: FormErrors = {}
        if (!formData.email) newErrors.email = "Email is required"
        if (!formData.password) newErrors.password = "Password is required"
        if (Object.keys(newErrors).length > 0) { setError(newErrors); return }
        setLoading(true)
        const success = await login(formData.email, formData.password)
        setLoading(false)
        if (success) navigate(from, { replace: true })
    }

    return (
        <div className="flex items-center justify-center px-4 min-h-[calc(100vh-130px)]">
            <div className="w-full max-w-[400px]">

                {/* Brand */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center bg-[#FF8C38] rounded-xl p-2.5 mb-3 shadow-[0_4px_14px_rgba(255,140,56,0.35)]">
                        <Bike className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-[22px] font-extrabold text-slate-900 m-0 tracking-[-0.4px]">
                        Sign in to Vrooom
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Welcome back! Enter your details below.
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

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] pointer-events-none ${error.email ? "text-red-500" : "text-slate-400"}`} />
                                <input
                                    id="login-email"
                                    type="email" name="email"
                                    value={formData.email}
                                    placeholder="you@example.com"
                                    onChange={handleInput}
                                    disabled={isLoading}
                                    className={`w-full py-[11px] pl-[42px] pr-4 rounded-[10px] text-sm border-[1.5px] outline-none transition-all duration-200 ${
                                        error.email
                                            ? "border-red-300 bg-red-50 text-slate-900 focus:bg-white"
                                            : "border-slate-200 bg-slate-50 text-slate-900 focus:border-[#FF8C38] focus:ring-[3px] focus:ring-[#FF8C38]/15 focus:bg-white"
                                    }`}
                                />
                            </div>
                            {error.email && (
                                <p className="text-red-500 text-[11px] mt-1 font-medium">
                                    {error.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="text-xs font-semibold text-gray-700">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    className="bg-transparent border-none p-0 text-[#FF8C38] text-[11px] font-semibold cursor-pointer hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] pointer-events-none ${error.password ? "text-red-500" : "text-slate-400"}`} />
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    placeholder="••••••••"
                                    onChange={handleInput}
                                    disabled={isLoading}
                                    className={`w-full py-[11px] pl-[42px] pr-[42px] rounded-[10px] text-sm border-[1.5px] outline-none transition-all duration-200 ${
                                        error.password
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
                                    {showPassword
                                        ? <EyeOff className="w-[15px] h-[15px]" />
                                        : <Eye className="w-[15px] h-[15px]" />
                                    }
                                </button>
                            </div>
                            {error.password && (
                                <p className="text-red-500 text-[11px] mt-1 font-medium">
                                    {error.password}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            id="login-submit-btn"
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-[13px] mt-1 rounded-[10px] border-none text-white text-[14px] font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                                isLoading
                                    ? "bg-orange-300 cursor-not-allowed shadow-none"
                                    : "bg-gradient-to-br from-[#FF8C38] to-[#FF6B00] cursor-pointer shadow-[0_4px_14px_rgba(255,140,56,0.35)] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(255,140,56,0.45)]"
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="w-4 h-4 animate-spin text-white"
                                        fill="none" viewBox="0 0 24 24"
                                    >
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                    Signing in…
                                </>
                            ) : "Sign in →"}
                        </button>
                    </form>
                </div>

                {/* Sign up nudge */}
                <p className="text-center mt-4 text-[13px] text-slate-500">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-[#FF8C38] font-bold no-underline hover:underline"
                    >
                        Create one now
                    </Link>
                </p>
            </div>
        </div>
    )
}