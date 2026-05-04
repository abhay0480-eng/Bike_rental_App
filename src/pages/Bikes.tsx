import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { SlidersHorizontal, X, Bike } from "lucide-react"
import { ShimBikesListing } from "../ui/ShimmerUI/ShimBikesListing"
import { getAllBikes } from "../api/bikes"
import type { Bike as BikeType } from "../api/type"

/* ─── filter config ───────────────────────────────────────────── */
const FILTERS = [
    { label: "All",    value: ""        },
    { label: "Simple", value: "simple"  },
    { label: "Luxury", value: "luxury"  },
    { label: "Rugged", value: "rugged"  },
] as const

/* ─── bike card ───────────────────────────────────────────────── */
const chipColors: Record<string, string> = {
    simple:  "bg-orange-100 text-orange-600",
    luxury:  "bg-slate-100 text-slate-700",
    rugged:  "bg-stone-100 text-stone-700",
}

const BikeCard = ({ bike, search }: { bike: BikeType; search: string }) => (
    <Link
        to={`/bikes/${bike.id}`}
        state={{ search }}
        className="group block bg-white rounded-2xl overflow-hidden
                   border border-slate-100 shadow-sm hover:shadow-lg
                   transition-all duration-300 hover:-translate-y-1"
    >
        {/* image */}
        <div className="relative overflow-hidden bg-slate-50 aspect-[4/3]">
            <img
                src={bike.imageUrl}
                alt={bike.name}
                className="w-full h-full object-cover group-hover:scale-105
                           transition-transform duration-500"
            />
            {/* type badge */}
            <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1
                              rounded-full capitalize ${chipColors[bike.type] ?? chipColors.simple}`}>
                {bike.type}
            </span>
        </div>

        {/* info */}
        <div className="p-4">
            <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2">
                    {bike.name}
                </h3>
                <div className="shrink-0 text-right">
                    <p className="font-extrabold text-orange-500 text-base">
                        ₹{bike.price}
                    </p>
                    <p className="text-slate-400 text-xs">/day</p>
                </div>
            </div>
            <p className="mt-3 text-xs font-semibold text-orange-500
                          group-hover:underline underline-offset-2 transition-all">
                View details →
            </p>
        </div>
    </Link>
)

/* ─── empty state ─────────────────────────────────────────────── */
const EmptyState = ({ onClear }: { onClear: () => void }) => (
    <div className="col-span-full flex flex-col items-center justify-center
                    py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center
                        justify-center mb-4">
            <Bike className="w-8 h-8 text-orange-400" />
        </div>
        <p className="text-slate-700 font-bold text-lg">No bikes found</p>
        <p className="text-slate-400 text-sm mt-1 mb-5">
            Try a different filter or clear your selection.
        </p>
        <button
            onClick={onClear}
            className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400
                       text-white font-semibold text-sm px-5 py-2.5 rounded-xl
                       transition-colors duration-200 cursor-pointer"
        >
            <X className="w-4 h-4" />
            Clear filter
        </button>
    </div>
)

/* ─── page ────────────────────────────────────────────────────── */
export const Bikes = () => {
    const [bikesData, setBikesData] = useState<BikeType[]>([])
    const [isLoading, setIsLoading]   = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const type = searchParams.get("type") ?? ""

    const fetchBikes = async () => {
        try {
            setIsLoading(true)
            const data = await getAllBikes(type || undefined)
            setBikesData(data)
        } catch (err) {
            console.error("Failed to fetch bikes:", err)
            setBikesData([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { fetchBikes() }, [type])

    const handleFilter = (value: string) => {
        value ? setSearchParams({ type: value }) : setSearchParams({})
    }

    return (
        <div className="min-h-screen bg-[#FFFBF5]">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">

                {/* ── page header ── */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                        Explore our Bikes
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {isLoading
                            ? "Loading…"
                            : `${bikesData.length} bike${bikesData.length !== 1 ? "s" : ""} available${type ? ` · ${type}` : ""}`}
                    </p>
                </div>

                {/* ── filter pills ── */}
                <div className="flex flex-wrap items-center gap-2 mb-8">
                    <span className="flex items-center gap-1.5 text-slate-500 text-sm font-medium mr-1">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filter
                    </span>

                    {FILTERS.map(({ label, value }) => {
                        const isActive = type === value
                        return (
                            <button
                                key={value || "all"}
                                onClick={() => handleFilter(value)}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold
                                            border transition-all duration-200 cursor-pointer
                                            ${isActive
                                                ? "bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-200"
                                                : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-500"
                                            }`}
                            >
                                {label}
                            </button>
                        )
                    })}

                    {type && (
                        <button
                            onClick={() => handleFilter("")}
                            className="inline-flex items-center gap-1 text-xs text-slate-400
                                       hover:text-red-400 transition-colors duration-200 ml-1 cursor-pointer"
                        >
                            <X className="w-3.5 h-3.5" />
                            Clear
                        </button>
                    )}
                </div>

                {/* ── grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                    {isLoading ? (
                        <ShimBikesListing />
                    ) : bikesData.length === 0 ? (
                        <EmptyState onClear={() => handleFilter("")} />
                    ) : (
                        bikesData.map((bike) => (
                            <BikeCard
                                key={bike.id}
                                bike={bike}
                                search={searchParams.toString()}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}