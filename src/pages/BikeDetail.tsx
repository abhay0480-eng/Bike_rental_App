import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router"
import { ArrowLeft, Shield, Clock, MapPin, Star } from "lucide-react"
import { ShimBikeDetail } from "../ui/ShimmerUI/ShimBikeDetail"
import { getBikeById } from "../api/bikes"
import type { Bike } from "../api/type"

/* ─── type badge colours ──────────────────────────────────────── */
const chipColors: Record<string, { bg: string; text: string }> = {
    simple:  { bg: "bg-orange-100",  text: "text-orange-600"  },
    luxury:  { bg: "bg-slate-100",   text: "text-slate-700"   },
    rugged:  { bg: "bg-stone-100",   text: "text-stone-700"   },
}

/* ─── small feature pill ──────────────────────────────────────── */
const FeaturePill = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-4 py-2.5">
        <span className="text-orange-500">{icon}</span>
        <span className="text-slate-700 text-sm font-medium">{label}</span>
    </div>
)

/* ─── page ────────────────────────────────────────────────────── */
export const BikeDetail = () => {
    const { id }  = useParams()
    const location = useLocation()
    const search   = location.state?.search ?? ""

    const [bike, setBike]         = useState<Bike | null>(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (!id) return
        ;(async () => {
            try {
                setLoading(true)
                const data = await getBikeById(id)
                setBike(data)
            } catch (err) {
                console.error("Failed to fetch bike:", err)
                setBike(null)
            } finally {
                setLoading(false)
            }
        })()
    }, [id])

    const chip = chipColors[bike?.type ?? "simple"] ?? chipColors.simple

    return (
        <div className="min-h-screen bg-[#FFFBF5]">
            <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">

                {/* ── back link ── */}
                <Link
                    to={`..?${search}`}
                    relative="path"
                    className="inline-flex items-center gap-1.5 text-slate-500 hover:text-orange-500
                               text-sm font-medium mb-8 transition-colors duration-200"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to all bikes
                </Link>

                {isLoading ? (
                    <ShimBikeDetail />
                ) : bike ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                        {/* ── LEFT — image ── */}
                        <div className="lg:sticky lg:top-24">
                            <div className="rounded-2xl overflow-hidden bg-slate-100 shadow-md aspect-[4/3]">
                                <img
                                    src={bike.imageUrl}
                                    alt={bike.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* feature pills — show below image on desktop */}
                            <div className="hidden lg:grid grid-cols-2 gap-3 mt-5">
                                <FeaturePill icon={<Shield className="w-4 h-4" />}  label="Fully Insured"    />
                                <FeaturePill icon={<Clock className="w-4 h-4" />}   label="60-sec Booking"  />
                                <FeaturePill icon={<MapPin className="w-4 h-4" />}  label="Flexible Pickup" />
                                <FeaturePill icon={<Star className="w-4 h-4" />}    label="Top Rated"       />
                            </div>
                        </div>

                        {/* ── RIGHT — info ── */}
                        <div className="flex flex-col gap-5">

                            {/* type badge */}
                            <span className={`inline-flex self-start items-center px-3 py-1
                                             rounded-full text-xs font-bold capitalize
                                             ${chip.bg} ${chip.text}`}>
                                {bike.type}
                            </span>

                            {/* name */}
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-snug">
                                {bike.name}
                            </h1>

                            {/* price */}
                            <div className="flex items-end gap-1.5">
                                <span className="text-4xl font-extrabold text-orange-500">
                                    ₹{bike.price}
                                </span>
                                <span className="text-slate-400 text-base mb-1">/day</span>
                            </div>

                            {/* divider */}
                            <hr className="border-slate-100" />

                            {/* description */}
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {bike.description}
                            </p>

                            {/* host info (if available) */}
                            {bike.hostedBy && (
                                <div className="flex items-center gap-3 bg-slate-50
                                                rounded-xl px-4 py-3 border border-slate-100">
                                    <div className="w-9 h-9 rounded-full bg-orange-500
                                                    flex items-center justify-center
                                                    text-white font-bold text-sm shrink-0">
                                        {bike.hostedBy.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Hosted by</p>
                                        <p className="text-sm font-semibold text-slate-700">
                                            {bike.hostedBy}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* feature pills — mobile only */}
                            <div className="grid grid-cols-2 gap-3 lg:hidden">
                                <FeaturePill icon={<Shield className="w-4 h-4" />}  label="Fully Insured"    />
                                <FeaturePill icon={<Clock className="w-4 h-4" />}   label="60-sec Booking"  />
                                <FeaturePill icon={<MapPin className="w-4 h-4" />}  label="Flexible Pickup" />
                                <FeaturePill icon={<Star className="w-4 h-4" />}    label="Top Rated"       />
                            </div>

                            {/* CTA */}
                            <button
                                id="rent-bike-btn"
                                className="w-full bg-orange-500 hover:bg-orange-400
                                           text-white font-bold text-base py-4 rounded-xl
                                           shadow-lg shadow-orange-200 hover:shadow-orange-300
                                           transition-all duration-300 hover:-translate-y-0.5
                                           cursor-pointer mt-2"
                            >
                                Rent this Bike — ₹{bike.price}/day
                            </button>

                            <p className="text-center text-slate-400 text-xs">
                                No hidden fees · Cancel up to 24h before pickup
                            </p>
                        </div>
                    </div>
                ) : (
                    /* ── not found ── */
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <p className="text-slate-700 font-bold text-xl">Bike not found</p>
                        <p className="text-slate-400 text-sm mt-2 mb-6">
                            This bike may no longer be available.
                        </p>
                        <Link
                            to="/bikes"
                            className="bg-orange-500 text-white font-semibold px-6 py-3
                                       rounded-xl hover:bg-orange-400 transition-colors"
                        >
                            Browse all bikes
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}