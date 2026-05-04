import { useState, useEffect } from "react"
import { Link, NavLink, useNavigate } from "react-router"
import { Bike, Menu, X, LogOut, User } from "lucide-react"
import { useAuth } from "../context/AuthContext"

const NAV_LINKS = [
    { to: "/about", label: "About" },
    { to: "/bikes", label: "Bikes" },
    { to: "/host",  label: "Host"  },
]

const activeClass =
    "text-orange-500 font-bold"
const inactiveClass =
    "text-slate-600 hover:text-slate-900 transition-colors duration-200"

export const Header = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    /* scroll shadow */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    /* close drawer on route change / ESC */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    /* prevent body scroll when drawer is open */
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [menuOpen])

    const handleLogout = async () => {
        const success = await logout()
        if (success) { navigate("/"); setMenuOpen(false) }
    }

    return (
        <>
            {/* ── sticky bar ── */}
            <header
                className={`sticky top-0 z-50 w-full transition-all duration-300
                    ${scrolled
                        ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100"
                        : "bg-[#FFF7ED]"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">

                    {/* ── logo ── */}
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        <div className="flex items-center gap-2 group">
                            <div className="bg-orange-400 p-2 rounded-xl shadow-sm
                                            group-hover:bg-orange-500 transition-colors duration-200">
                                <Bike className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                                Vrooom
                            </span>
                        </div>
                    </Link>

                    {/* ── desktop nav ── */}
                    <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
                        {NAV_LINKS.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg transition-all duration-200
                                    ${isActive
                                        ? "bg-orange-50 text-orange-500 font-bold"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}

                        {/* auth */}
                        {user ? (
                            <div className="flex items-center gap-3 ml-3 pl-3 border-l border-slate-200">
                                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                    <User className="w-4 h-4" />
                                    <span className="max-w-[120px] truncate">{user.email}</span>
                                </div>
                                <button
                                    id="desktop-logout-btn"
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100
                                               text-red-500 font-semibold text-sm px-3 py-1.5 rounded-lg
                                               transition-all duration-200 cursor-pointer border border-red-100"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <NavLink
                                to="/login"
                                id="desktop-login-link"
                                className={({ isActive }) =>
                                    `ml-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm
                                    transition-all duration-200
                                    ${isActive
                                        ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                                        : "bg-orange-500 text-white hover:bg-orange-400 shadow-md shadow-orange-200 hover:shadow-orange-300"
                                    }`
                                }
                            >
                                Login
                            </NavLink>
                        )}
                    </nav>

                    {/* ── hamburger (mobile only) ── */}
                    <button
                        id="mobile-menu-toggle"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg
                                   bg-slate-100 hover:bg-slate-200 text-slate-700
                                   transition-colors duration-200"
                    >
                        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </header>

            {/* ── mobile backdrop ── */}
            <div
                onClick={() => setMenuOpen(false)}
                className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300
                            md:hidden
                            ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />

            {/* ── mobile drawer (slides from right) ── */}
            <aside
                className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl
                            flex flex-col transition-transform duration-300 ease-in-out
                            md:hidden
                            ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* drawer header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="bg-orange-400 p-1.5 rounded-lg">
                            <Bike className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-extrabold text-slate-900">Vrooom</span>
                    </div>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200
                                   flex items-center justify-center text-slate-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* drawer links */}
                <nav className="flex flex-col gap-1 p-4 flex-1">
                    {NAV_LINKS.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `px-4 py-3 rounded-xl font-semibold text-base transition-all duration-200
                                ${isActive
                                    ? "bg-orange-50 text-orange-500 font-bold"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* drawer footer — auth */}
                <div className="p-4 border-t border-slate-100">
                    {user ? (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-slate-500 text-sm px-1">
                                <User className="w-4 h-4 shrink-0" />
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <button
                                id="mobile-logout-btn"
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2
                                           bg-red-50 hover:bg-red-100 text-red-500 font-semibold
                                           py-3 rounded-xl transition-colors duration-200
                                           border border-red-100 cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            id="mobile-login-link"
                            className="block w-full text-center bg-orange-500 hover:bg-orange-400
                                       text-white font-bold py-3 rounded-xl
                                       shadow-md shadow-orange-200 transition-all duration-200"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </aside>
        </>
    )
}