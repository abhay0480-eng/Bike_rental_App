import { NavLink, Outlet } from "react-router"
import { LayoutDashboard, Bike, TrendingUp, Star } from "lucide-react"

const HOST_NAV = [
    { to: "/host",          label: "Dashboard",  icon: <LayoutDashboard className="w-4 h-4" />, end: true  },
    { to: "/host/income",   label: "Income",     icon: <TrendingUp className="w-4 h-4" />,      end: false },
    { to: "/host/bikes",    label: "Your Bikes", icon: <Bike className="w-4 h-4" />,            end: false },
    { to: "/host/reviews",  label: "Reviews",    icon: <Star className="w-4 h-4" />,            end: false },
]

export const Host = () => {
    return (
        <div className="min-h-screen bg-[#FFFBF5]">
            {/* ── sub-nav ── */}
            <div className="bg-white border-b border-slate-100 sticky top-16 z-40">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
                        {HOST_NAV.map(({ to, label, icon, end }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    `flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold
                                     whitespace-nowrap transition-all duration-200
                                     ${isActive
                                         ? "bg-orange-50 text-orange-500"
                                         : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                                     }`
                                }
                            >
                                {icon}
                                {label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>

            {/* ── content ── */}
            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
                <Outlet />
            </div>
        </div>
    )
}