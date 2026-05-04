import { useEffect, useState } from "react"
import { Link } from "react-router"
import { TrendingUp, Star, Bike, ChevronRight, ArrowUpRight } from "lucide-react"
import { ShimHostBikesUI } from "../../ui/ShimmerUI/ShimHostBikesUI"
import { getHostBikes } from "../../api/bikes"
import { useAuth } from "../../context/AuthContext"
import type { Bike as BikeType } from "../../api/type"

/* ─── stat card ───────────────────────────────────────────────── */
const StatCard = ({
    icon, label, value, linkTo, linkLabel,
}: {
    icon: React.ReactNode
    label: string
    value: string
    linkTo: string
    linkLabel: string
}) => (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <span className="text-slate-500 text-sm font-medium">{label}</span>
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-500
                            flex items-center justify-center">
                {icon}
            </div>
        </div>
        <p className="text-3xl font-extrabold text-slate-800">{value}</p>
        <Link
            to={linkTo}
            className="inline-flex items-center gap-1 text-orange-500 text-xs font-semibold
                       hover:gap-2 transition-all duration-200"
        >
            {linkLabel}
            <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
    </div>
)

/* ─── bike row ────────────────────────────────────────────────── */
const chipColors: Record<string, { bg: string; text: string }> = {
    simple:  { bg: "bg-orange-100", text: "text-orange-600" },
    luxury:  { bg: "bg-slate-100",  text: "text-slate-600"  },
    rugged:  { bg: "bg-stone-100",  text: "text-stone-600"  },
}

const BikeRow = ({ bike }: { bike: BikeType }) => {
    const chip = chipColors[bike.type] ?? chipColors.simple
    return (
        <Link
            to={`/host/bikes/${bike.id}`}
            className="group flex items-center gap-4 p-4 rounded-xl
                       hover:bg-orange-50 transition-colors duration-200"
        >
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                    src={bike.imageUrl}
                    alt={bike.name}
                    className="w-full h-full object-cover group-hover:scale-105
                               transition-transform duration-300"
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm truncate">{bike.name}</p>
                <p className="text-slate-400 text-xs mt-0.5">₹{bike.price}/day</p>
            </div>
            <span className={`hidden sm:inline-flex text-xs font-bold px-2.5 py-1
                              rounded-full capitalize shrink-0 ${chip.bg} ${chip.text}`}>
                {bike.type}
            </span>
            <span className="text-xs font-semibold text-orange-500 shrink-0
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200
                             flex items-center gap-0.5">
                Edit <ChevronRight className="w-3.5 h-3.5" />
            </span>
        </Link>
    )
}

/* ─── page ────────────────────────────────────────────────────── */
export const Dashboard = () => {
    const { user } = useAuth()
    const [hostBikeList, setHostBikeList] = useState<BikeType[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        ;(async () => {
            try {
                setIsLoading(true)
                const data = await getHostBikes()
                setHostBikeList(data)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    /* derive a first-name from email or displayName */
    const displayName = user?.displayName?.split(" ")[0]
        ?? user?.email?.split("@")[0]
        ?? "Host"

    return (
        <div className="flex flex-col gap-8">

            {/* ── greeting ── */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                    Welcome back, {displayName} 👋
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Here's what's happening with your listings today.
                </p>
            </div>

            {/* ── stat cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                    icon={<TrendingUp className="w-4 h-4" />}
                    label="Income · Last 30 Days"
                    value="₹2,260"
                    linkTo="/host/income"
                    linkLabel="View details"
                />
                <StatCard
                    icon={<Star className="w-4 h-4" />}
                    label="Review Score"
                    value="5.0 / 5"
                    linkTo="/host/reviews"
                    linkLabel="See all reviews"
                />
                <StatCard
                    icon={<Bike className="w-4 h-4" />}
                    label="Bikes Listed"
                    value={isLoading ? "—" : `${hostBikeList.length}`}
                    linkTo="/host/bikes"
                    linkLabel="Manage bikes"
                />
            </div>

            {/* ── bikes list ── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h2 className="font-bold text-slate-800 text-sm">Your listed Bikes</h2>
                    <Link
                        to="/host/bikes"
                        className="text-orange-500 text-xs font-semibold hover:underline
                                   underline-offset-2 flex items-center gap-1"
                    >
                        View all <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="divide-y divide-slate-50">
                    {isLoading ? (
                        <ShimHostBikesUI count={4} />
                    ) : hostBikeList.length === 0 ? (
                        <div className="flex flex-col items-center py-12 text-center px-5">
                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center
                                            justify-center mb-3">
                                <Bike className="w-6 h-6 text-orange-400" />
                            </div>
                            <p className="font-semibold text-slate-700 text-sm">No bikes listed yet</p>
                            <p className="text-slate-400 text-xs mt-1">
                                Add your first bike to start earning.
                            </p>
                        </div>
                    ) : (
                        hostBikeList.slice(0, 5).map((bike) => (
                            <BikeRow key={bike.id} bike={bike} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}