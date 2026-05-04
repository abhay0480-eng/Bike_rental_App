import { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useParams } from "react-router"
import { ArrowLeft } from "lucide-react"
import { ShimHostBikeDetailUI } from "../../ui/ShimmerUI/ShimHostBikeDetailUI"
import { getBikeById } from "../../api/bikes"
import type { Bike } from "../../api/type"

const chipColors: Record<string, { bg: string; text: string }> = {
    simple:  { bg: "bg-orange-100", text: "text-orange-600" },
    luxury:  { bg: "bg-slate-100",  text: "text-slate-600"  },
    rugged:  { bg: "bg-stone-100",  text: "text-stone-600"  },
}

const tabClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200
     ${isActive
         ? "bg-orange-50 text-orange-500"
         : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
     }`

export const HostDetailBikes = () => {
    const { id } = useParams()
    const [bikeDetail, setBikeDetail] = useState<Bike | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!id) return
        ;(async () => {
            try {
                setIsLoading(true)
                const data = await getBikeById(id)
                setBikeDetail(data)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [id])

    const chip = chipColors[bikeDetail?.type ?? "simple"] ?? chipColors.simple

    return (
        <div className="flex flex-col gap-6">

            {/* ── back link ── */}
            <Link
                to=".."
                relative="path"
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-orange-500
                           text-sm font-medium transition-colors duration-200 self-start"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to your bikes
            </Link>

            {/* ── bike header card ── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                {isLoading ? (
                    <ShimHostBikeDetailUI />
                ) : bikeDetail ? (
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                        {/* thumbnail */}
                        <div className="w-full sm:w-36 h-36 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                            <img
                                src={bikeDetail.imageUrl}
                                alt={bikeDetail.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* info */}
                        <div className="flex flex-col gap-2">
                            <span className={`self-start text-xs font-bold px-2.5 py-1
                                             rounded-full capitalize ${chip.bg} ${chip.text}`}>
                                {bikeDetail.type}
                            </span>
                            <h1 className="text-xl font-extrabold text-slate-800 leading-snug">
                                {bikeDetail.name}
                            </h1>
                            <p className="text-slate-500 text-sm">
                                <span className="font-bold text-orange-500">₹{bikeDetail.price}</span>
                                <span className="text-slate-400"> /day</span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-slate-400 text-sm">Bike not found.</p>
                )}

                {/* ── tab nav ── */}
                <div className="flex gap-1 mt-5 border-t border-slate-100 pt-4">
                    <NavLink
                        to={`/host/bikes/${id}`}
                        end
                        className={tabClass}
                    >
                        Details
                    </NavLink>
                    <NavLink to={`/host/bikes/${id}/pricing`} className={tabClass}>
                        Pricing
                    </NavLink>
                    <NavLink to={`/host/bikes/${id}/photos`} className={tabClass}>
                        Photos
                    </NavLink>
                </div>
            </div>

            {/* ── outlet ── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <Outlet context={{ bikeDetail }} />
            </div>
        </div>
    )
}