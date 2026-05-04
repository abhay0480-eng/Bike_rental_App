import { Link } from "react-router"
import { useEffect, useRef, useState } from "react"
import {
    MapPin, Heart, Shield, Users,
    ArrowRight, Star, Mountain, Bike
} from "lucide-react"

/* ─── scroll-reveal hook ──────────────────────────────────────── */
const useInView = (threshold = 0.15) => {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return { ref, visible }
}

/* ─── data ────────────────────────────────────────────────────── */
const values = [
    {
        icon: <Heart className="w-6 h-6" />,
        title: "Passion-Driven",
        desc: "We're riders ourselves. Every policy, every bike, every support call is shaped by the love of the open road.",
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Safety First",
        desc: "Fully inspected bikes, comprehensive insurance, and 24/7 roadside assistance so you're never stranded.",
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Community-Owned",
        desc: "Our fleet is hosted by local bike owners who love sharing their machines and their local knowledge.",
    },
    {
        icon: <MapPin className="w-6 h-6" />,
        title: "Explore Anywhere",
        desc: "From Ladakh to Coorg, from city boulevards to coastal highways — we cover India's most thrilling routes.",
    },
]

const team = [
    { name: "Vikram Nair",   role: "Founder & Rider",        initials: "VN", color: "bg-orange-500" },
    { name: "Ananya Joshi",  role: "Head of Operations",      initials: "AJ", color: "bg-amber-500"  },
    { name: "Karan Mehta",   role: "Fleet & Maintenance",     initials: "KM", color: "bg-slate-700"  },
    { name: "Sneha Iyer",    role: "Customer Experience",     initials: "SI", color: "bg-stone-600"  },
]

const milestones = [
    { year: "2022", event: "Vrooom founded with 12 bikes in Bengaluru" },
    { year: "2023", event: "Expanded to 10 cities & 1,000+ happy riders" },
    { year: "2024", event: "Launched host program — 300+ local bike owners joined" },
    { year: "2025", event: "5,000+ rides completed across 50+ cities in India" },
]

/* ─── reusable card ───────────────────────────────────────────── */
const ValueCard = ({
    icon, title, desc, delay,
}: { icon: React.ReactNode; title: string; desc: string; delay: number }) => {
    const { ref, visible } = useInView()
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`group bg-white rounded-2xl p-7 shadow-md hover:shadow-xl
                        border border-orange-100 transition-all duration-700 ease-out
                        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl
                            bg-orange-50 text-orange-500 mb-4
                            group-hover:bg-orange-500 group-hover:text-white
                            transition-colors duration-300">
                {icon}
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}

/* ─── main page ───────────────────────────────────────────────── */
export const About = () => {
    const missionRef = useInView(0.1)
    const timelineRef = useInView(0.1)
    const teamRef    = useInView(0.1)

    return (
        <div className="bg-[#FFFBF5] overflow-x-hidden">

            {/* ══════════ HERO ══════════ */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
                {/* background */}
                <img
                    src="https://res.cloudinary.com/dguqivg6t/image/upload/samples/bikes/ChatGPT_Image_Apr_28_2026_01_05_21_PM_czbzas.png"
                    alt="Riders on a scenic road"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                {/* warm bottom blend */}
                <div className="absolute bottom-0 left-0 right-0 h-24
                                bg-gradient-to-t from-[#FFFBF5] to-transparent" />

                {/* text */}
                <div className="relative z-10 px-6 sm:px-12 md:px-20 pb-14 max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30
                                    backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
                        <Mountain className="w-4 h-4 text-orange-300" />
                        <span className="text-orange-200 text-sm font-semibold">Our Story</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
                        Don't hail a cab —<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                            ride a bike.
                        </span>
                    </h1>
                    <p className="text-slate-300 text-base sm:text-lg mt-4 max-w-lg leading-relaxed">
                        Our mission is to give every traveller in India the freedom to
                        explore at their own pace, on their own terms.
                    </p>
                </div>
            </section>

            {/* ══════════ MISSION ══════════ */}
            <section className="py-20 px-6 sm:px-12 md:px-20 max-w-6xl mx-auto">
                <div
                    ref={missionRef.ref}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center
                                transition-all duration-700 ease-out
                                ${missionRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    {/* text side */}
                    <div>
                        <span className="text-orange-500 font-bold text-sm tracking-widest uppercase">
                            Who We Are
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-2 leading-snug">
                            Built by riders,<br />for riders.
                        </h2>
                        <p className="text-slate-500 mt-5 leading-relaxed">
                            Vrooom started on a Spiti Valley road trip. Our founder's rental
                            broke down in the middle of nowhere and help took six hours to arrive.
                            That day, we decided India deserved better.
                        </p>
                        <p className="text-slate-500 mt-4 leading-relaxed">
                            Today, every bike in our fleet is serviced before each rental,
                            every ride is fully insured, and our support team is staffed
                            24/7 by people who've actually ridden these routes.
                        </p>
                        <div className="flex flex-wrap gap-6 mt-8">
                            {[
                                { value: "5,000+", label: "Happy Riders" },
                                { value: "4.9 ★",  label: "Average Rating" },
                                { value: "50+",    label: "Cities" },
                            ].map(({ value, label }) => (
                                <div key={label}>
                                    <p className="text-3xl font-extrabold text-orange-500">{value}</p>
                                    <p className="text-slate-500 text-sm">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* image / accent side */}
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                            <img
                                src="https://res.cloudinary.com/dguqivg6t/image/upload/samples/bikes/ChatGPT_Image_Apr_28_2026_01_05_21_PM_czbzas.png"
                                alt="Bike on mountain road"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* floating badge */}
                        <div className="absolute -bottom-5 -left-5 bg-orange-500 text-white
                                        rounded-2xl px-5 py-4 shadow-xl shadow-orange-200">
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-white" />
                                <span className="font-extrabold text-lg">4.9 / 5</span>
                            </div>
                            <p className="text-orange-100 text-xs mt-0.5">From 5,000+ rides</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ VALUES ══════════ */}
            <section className="py-20 px-6 sm:px-12 md:px-20 bg-orange-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-orange-500 font-bold text-sm tracking-widest uppercase">
                            Our Values
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-2">
                            What drives us every day
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {values.map((v, i) => (
                            <ValueCard key={v.title} {...v} delay={i * 100} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ TIMELINE ══════════ */}
            <section className="py-20 px-6 sm:px-12 md:px-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-14">
                        <span className="text-orange-400 font-bold text-sm tracking-widest uppercase">Our Journey</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                            From 12 bikes to 5,000 rides
                        </h2>
                    </div>
                    <div
                        ref={timelineRef.ref}
                        className={`relative flex flex-col gap-0 transition-all duration-700 ease-out
                                    ${timelineRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    >
                        {/* vertical line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-orange-500/30 hidden sm:block" />

                        {milestones.map(({ year, event }, i) => (
                            <div
                                key={year}
                                style={{ transitionDelay: `${i * 120}ms` }}
                                className="relative flex items-start gap-6 pb-10 last:pb-0"
                            >
                                {/* dot */}
                                <div className="hidden sm:flex w-12 h-12 shrink-0 rounded-full bg-orange-500
                                                text-white font-extrabold text-sm items-center justify-center
                                                shadow-lg shadow-orange-500/30 relative z-10">
                                    {year.slice(2)}
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex-1
                                                hover:bg-white/10 transition-colors duration-300">
                                    <span className="text-orange-400 font-bold text-sm">{year}</span>
                                    <p className="text-slate-300 mt-1 text-sm leading-relaxed">{event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ TEAM ══════════ */}
            <section className="py-20 px-6 sm:px-12 md:px-20">
                <div
                    ref={teamRef.ref}
                    className={`max-w-5xl mx-auto transition-all duration-700 ease-out
                                ${teamRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    <div className="text-center mb-12">
                        <span className="text-orange-500 font-bold text-sm tracking-widest uppercase">The Team</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-2">
                            Passionate riders, every one
                        </h2>
                        <p className="text-slate-500 mt-3 max-w-lg mx-auto">
                            Our team has collectively covered Ladakh, Spiti, Coorg, and the Konkan coast.
                            They're here to help you do the same.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {team.map(({ name, role, initials, color }) => (
                            <div key={name} className="text-center group">
                                <div className={`${color} w-20 h-20 rounded-2xl flex items-center justify-center
                                                mx-auto mb-4 text-white text-2xl font-extrabold
                                                group-hover:scale-105 transition-transform duration-300 shadow-lg`}>
                                    {initials}
                                </div>
                                <p className="font-bold text-slate-800 text-sm">{name}</p>
                                <p className="text-slate-400 text-xs mt-0.5">{role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ CTA BANNER ══════════ */}
            <section className="py-16 px-6 sm:px-12 md:px-20 pb-24">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-orange-500 to-amber-400
                                rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-2xl shadow-orange-200">
                    <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/10 rounded-full blur-xl" />
                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Bike className="w-6 h-6 text-white" />
                                <span className="text-white/80 font-semibold text-sm uppercase tracking-widest">
                                    Ready to Ride?
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                                Your destination is waiting.
                            </h2>
                            <p className="text-white/80 mt-2 max-w-sm">
                                Every adventure starts with the first booking.
                            </p>
                        </div>
                        <Link to="/bikes" className="shrink-0">
                            <button
                                id="about-cta-explore-btn"
                                className="group inline-flex items-center gap-2
                                           bg-white text-orange-600 font-bold text-base
                                           px-8 py-4 rounded-xl shadow-lg
                                           hover:bg-orange-50 transition-all duration-300
                                           hover:-translate-y-0.5 whitespace-nowrap"
                            >
                                Explore our Bikes
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}