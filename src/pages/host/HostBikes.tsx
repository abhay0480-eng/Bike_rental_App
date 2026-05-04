import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Bike, ChevronRight, Plus } from "lucide-react"
import { ShimHostBikesUI } from "../../ui/ShimmerUI/ShimHostBikesUI"
import { getHostBikes } from "../../api/bikes"
import type { Bike as BikeType } from "../../api/type"

const chipColors: Record<string, { bg: string; text: string }> = {
    simple:  { bg: "bg-orange-100", text: "text-orange-600" },
    luxury:  { bg: "bg-slate-100",  text: "text-slate-600"  },
    rugged:  { bg: "bg-stone-100",  text: "text-stone-600"  },
}

export const HostBikes = () => {
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

    return (
        <div className="flex flex-col gap-6">

            {/* ── header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">Your Bikes</h1>
                    <p className="text-slate-500 text-sm mt-0.5">
                        {isLoading ? "Loading…" : `${hostBikeList.length} bike${hostBikeList.length !== 1 ? "s" : ""} listed`}
                    </p>
                </div>
                {/* placeholder — wire up when add-bike flow is ready */}
                <button
                    id="add-bike-btn"
                    className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400
                               text-white text-sm font-bold px-4 py-2.5 rounded-xl
                               transition-colors duration-200 cursor-pointer shadow-sm shadow-orange-200"
                >
                    <Plus className="w-4 h-4" />
                    Add bike
                </button>
            </div>

            {/* ── list ── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="divide-y divide-slate-50">
                        <ShimHostBikesUI count={6} />
                    </div>
                ) : hostBikeList.length === 0 ? (
                    <div className="flex flex-col items-center py-16 text-center px-5">
                        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center
                                        justify-center mb-4">
                            <Bike className="w-7 h-7 text-orange-400" />
                        </div>
                        <p className="font-bold text-slate-700">No bikes listed yet</p>
                        <p className="text-slate-400 text-sm mt-1 mb-5">
                            Add your first bike to start earning.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {hostBikeList.map((bike) => {
                            const chip = chipColors[bike.type] ?? chipColors.simple
                            return (
                                <Link
                                    key={bike.id}
                                    to={`/host/bikes/${bike.id}`}
                                    className="group flex items-center gap-4 p-4
                                               hover:bg-orange-50 transition-colors duration-200"
                                >
                                    {/* thumbnail */}
                                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                                        <img
                                            src={bike.imageUrl}
                                            alt={bike.name}
                                            className="w-full h-full object-cover group-hover:scale-105
                                                       transition-transform duration-300"
                                        />
                                    </div>

                                    {/* name + price */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-800 text-sm truncate">
                                            {bike.name}
                                        </p>
                                        <p className="text-slate-400 text-xs mt-0.5">
                                            ₹{bike.price}/day
                                        </p>
                                    </div>

                                    {/* type chip */}
                                    <span className={`hidden sm:inline-flex text-xs font-bold px-2.5 py-1
                                                      rounded-full capitalize shrink-0 ${chip.bg} ${chip.text}`}>
                                        {bike.type}
                                    </span>

                                    {/* edit caret */}
                                    <span className="text-orange-500 shrink-0 flex items-center gap-0.5
                                                     text-xs font-semibold opacity-0 group-hover:opacity-100
                                                     transition-opacity duration-200">
                                        Edit <ChevronRight className="w-3.5 h-3.5" />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}