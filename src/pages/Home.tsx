import { Link } from "react-router"
import { useEffect, useRef, useState } from "react"
import {
    ShieldCheck,
    Zap,
    MapPin,
    Star,
    ArrowRight,
    ChevronDown,
    Wind,
    Clock,
    Bike,
} from "lucide-react"

/* ─── tiny animation helper ──────────────────────────────────── */
const useInView = (threshold = 0.15) => {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return { ref, visible }
}

/* ─── data ────────────────────────────────────────────────────── */
const features = [
    {
        icon: <ShieldCheck className="w-7 h-7" />,
        title: "Fully Insured",
        desc: "Every ride is covered. Ride with total peace of mind, no hidden clauses.",
    },
    {
        icon: <Zap className="w-7 h-7" />,
        title: "Instant Booking",
        desc: "Book in under 60 seconds. No paperwork, no waiting — just ride.",
    },
    {
        icon: <MapPin className="w-7 h-7" />,
        title: "Drop-off Anywhere",
        desc: "Pick up in the city, drop off at your destination. We handle the rest.",
    },
    {
        icon: <Wind className="w-7 h-7" />,
        title: "Serviced Daily",
        desc: "Every bike is inspected & serviced before each rental for peak performance.",
    },
]

const steps = [
    { num: "01", title: "Browse Bikes", desc: "Filter by type — simple, luxury, or rugged — and find your perfect match." },
    { num: "02", title: "Book Instantly", desc: "Select your dates, confirm the booking, and get your confirmation in seconds." },
    { num: "03", title: "Ride & Explore", desc: "Pick up your bike and hit the road. Adventure is yours." },
]

const testimonials = [
    {
        name: "Arjun Mehta",
        location: "Mumbai → Manali",
        rating: 5,
        text: "The Himalayan I rented was in perfect condition. The entire process took 2 minutes. Best road-trip decision ever.",
        avatar: "AM",
    },
    {
        name: "Priya Sharma",
        location: "Delhi → Spiti Valley",
        rating: 5,
        text: "Vrooom made exploring Spiti so easy. The rugged bike handled every pass with ease, and support was just a call away.",
        avatar: "PS",
    },
    {
        name: "Rahul Desai",
        location: "Bengaluru → Coorg",
        rating: 5,
        text: "The scooter was spotless, the pricing was transparent, and the whole experience felt truly premium.",
        avatar: "RD",
    },
]

const stats = [
    { value: "5,000+", label: "Happy Riders" },
    { value: "120+", label: "Bikes Available" },
    { value: "50+", label: "Cities Covered" },
    { value: "4.9★", label: "Average Rating" },
]

/* ─── sub-components ──────────────────────────────────────────── */

const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode; title: string; desc: string; delay: number }) => {
    const { ref, visible } = useInView()
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`group bg-white rounded-2xl p-7 shadow-md hover:shadow-xl border border-orange-100
                        transition-all duration-700 ease-out cursor-default
                        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-orange-50
                            text-orange-500 mb-5 group-hover:bg-orange-500 group-hover:text-white
                            transition-colors duration-300">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}

const StepCard = ({ num, title, desc, delay }: { num: string; title: string; desc: string; delay: number }) => {
    const { ref, visible } = useInView()
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`relative flex flex-col items-center text-center px-6 transition-all duration-700 ease-out
                        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
            <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center
                            justify-center text-2xl font-extrabold mb-5 shadow-lg shadow-orange-200">
                {num}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{desc}</p>
        </div>
    )
}

const TestimonialCard = ({ name, location, rating, text, avatar, delay }: {
    name: string; location: string; rating: number; text: string; avatar: string; delay: number
}) => {
    const { ref, visible } = useInView()
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`bg-white rounded-2xl p-7 shadow-md border border-orange-100
                        transition-all duration-700 ease-out
                        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
            <div className="flex gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{text}"</p>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold
                                flex items-center justify-center text-sm shrink-0">
                    {avatar}
                </div>
                <div>
                    <p className="font-bold text-slate-800 text-sm">{name}</p>
                    <p className="text-slate-400 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {location}
                    </p>
                </div>
            </div>
        </div>
    )
}

/* ─── main component ──────────────────────────────────────────── */
export const Home = () => {
    /* floating particles in hero */
    const particles = Array.from({ length: 6 }, (_, i) => i)

    return (
        <div className="bg-[#FFFBF5] overflow-x-hidden">

            {/* ══════════ HERO ══════════ */}
            <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">

                {/* background image */}
                <div
                    className="absolute inset-0 bg-cover bg-right"
                    style={{ backgroundImage: "url('https://res.cloudinary.com/dguqivg6t/image/upload/samples/bikes/ChatGPT_Image_Apr_27_2026_10_47_24_PM_ensrh8.png')" }}
                />
                {/* gradient overlay — warm, not generic black */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
                {/* subtle warm bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFFBF5] to-transparent" />

                {/* floating orbs */}
                {particles.map((p) => (
                    <div
                        key={p}
                        className="absolute rounded-full bg-orange-400/10 animate-pulse"
                        style={{
                            width: `${60 + p * 30}px`,
                            height: `${60 + p * 30}px`,
                            top: `${10 + p * 12}%`,
                            left: `${5 + p * 8}%`,
                            animationDelay: `${p * 0.6}s`,
                            animationDuration: `${3 + p}s`,
                        }}
                    />
                ))}

                {/* hero content */}
                <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-3xl">
                    {/* badge */}
                    <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30
                                    backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                        <Bike className="w-4 h-4 text-orange-300" />
                        <span className="text-orange-200 text-sm font-semibold tracking-wide">India's #1 Bike Rental</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6">
                        You got the{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                            travel plans,
                        </span>
                        <br />
                        we got the bikes.
                    </h1>

                    <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                        Explore India on two wheels. Premium bikes, instant booking,
                        and service you can trust — wherever the road takes you.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/bikes">
                            <button
                                id="hero-find-bike-btn"
                                className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400
                                           text-white font-bold text-lg px-8 py-4 rounded-xl
                                           shadow-lg shadow-orange-500/30 hover:shadow-orange-400/40
                                           transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
                            >
                                Find your Bike
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </Link>
                        <Link to="/about">
                            <button
                                id="hero-learn-more-btn"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20
                                           border border-white/20 text-white font-semibold text-lg
                                           px-8 py-4 rounded-xl backdrop-blur-sm
                                           transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
                            >
                                Learn More
                            </button>
                        </Link>
                    </div>

                    {/* trust bar */}
                    <div className="flex flex-wrap items-center gap-5 mt-10">
                        <div className="flex items-center gap-1.5 text-slate-300 text-sm">
                            <ShieldCheck className="w-4 h-4 text-orange-400" />
                            <span>Fully Insured</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300 text-sm">
                            <Clock className="w-4 h-4 text-orange-400" />
                            <span>60-sec Booking</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300 text-sm">
                            <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                            <span>4.9 / 5 Rating</span>
                        </div>
                    </div>
                </div>

                {/* scroll cue */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-1 animate-bounce">
                    <span className="text-xs tracking-widest uppercase">Scroll</span>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </section>

            {/* ══════════ STATS BAR ══════════ */}
            <section className="bg-orange-500 py-10">
                <div className="max-w-5xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map(({ value, label }) => (
                        <div key={label} className="text-center">
                            <p className="text-3xl font-extrabold text-white">{value}</p>
                            <p className="text-orange-100 text-sm mt-1 font-medium">{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══════════ FEATURES ══════════ */}
            <section className="py-24 px-8 md:px-16 max-w-6xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-orange-500 font-bold text-sm tracking-widest uppercase">Why Vrooom</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mt-2">
                        Built for the bold explorer
                    </h2>
                    <p className="text-slate-500 mt-4 max-w-xl mx-auto">
                        We go beyond just handing you a key — we craft the entire experience
                        so your ride is smooth from start to finish.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <FeatureCard key={f.title} {...f} delay={i * 100} />
                    ))}
                </div>
            </section>

            {/* ══════════ HOW IT WORKS ══════════ */}
            <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
                {/* decorative blobs */}
                <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl" />

                <div className="relative z-10 text-center mb-14 px-8">
                    <span className="text-orange-400 font-bold text-sm tracking-widest uppercase">Process</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-2">
                        Ride in 3 simple steps
                    </h2>
                    <p className="text-slate-400 mt-4 max-w-xl mx-auto">
                        No queues, no deposits headaches — just an adventure waiting to happen.
                    </p>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {steps.map((s, i) => (
                        <StepCard key={s.num} {...s} delay={i * 120} />
                    ))}
                </div>

                <div className="relative z-10 text-center mt-14 px-8">
                    <Link to="/bikes">
                        <button
                            id="how-it-works-cta-btn"
                            className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400
                                       text-white font-bold text-lg px-10 py-4 rounded-xl
                                       shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Browse All Bikes
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </Link>
                </div>
            </section>

            {/* ══════════ BIKE CATEGORY CARDS ══════════ */}
            <section className="py-24 px-8 md:px-16 max-w-6xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-orange-500 font-bold text-sm tracking-widest uppercase">Categories</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mt-2">
                        Pick your ride style
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            type: "simple",
                            label: "Simple",
                            tagline: "City commutes & casual rides",
                            emoji: "🛵",
                            from: "from-orange-400",
                            to: "to-amber-300",
                        },
                        {
                            type: "luxury",
                            label: "Luxury",
                            tagline: "Premium comfort for long journeys",
                            emoji: "🏍️",
                            from: "from-slate-700",
                            to: "to-slate-500",
                        },
                        {
                            type: "rugged",
                            label: "Rugged",
                            tagline: "Off-road & mountain adventures",
                            emoji: "🤘",
                            from: "from-stone-700",
                            to: "to-stone-500",
                        },
                    ].map(({ type, label, tagline, emoji, from, to }, i) => (
                        <Link key={type} to={`/bikes?type=${type}`}>
                            <div
                                className={`group relative rounded-2xl bg-gradient-to-br ${from} ${to}
                                            p-8 h-52 flex flex-col justify-end overflow-hidden
                                            shadow-lg hover:shadow-2xl transition-all duration-400
                                            hover:-translate-y-1 cursor-pointer`}
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                {/* big emoji watermark */}
                                <span className="absolute right-6 top-4 text-7xl opacity-20 group-hover:opacity-30
                                                 group-hover:scale-110 transition-all duration-300 select-none">
                                    {emoji}
                                </span>
                                <span className="text-4xl mb-2">{emoji}</span>
                                <h3 className="text-2xl font-extrabold text-white">{label}</h3>
                                <p className="text-white/70 text-sm mt-1">{tagline}</p>
                                <div className="flex items-center gap-1 text-white font-semibold text-sm mt-3
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span>Explore</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ══════════ TESTIMONIALS ══════════ */}
            <section className="py-24 px-8 md:px-16 bg-orange-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-orange-500 font-bold text-sm tracking-widest uppercase">Reviews</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mt-2">
                            Riders love Vrooom
                        </h2>
                        <p className="text-slate-500 mt-4 max-w-lg mx-auto">
                            Join thousands of adventurers who've trusted us to power their best journeys.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <TestimonialCard key={t.name} {...t} delay={i * 100} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ HOST CTA ══════════ */}
            <section className="py-24 px-8 md:px-16">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800
                                rounded-3xl p-12 md:p-16 relative overflow-hidden">
                    {/* decorative */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-56 h-56 bg-amber-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <span className="text-orange-400 font-bold text-sm tracking-widest uppercase">For Bike Owners</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
                                Turn your bike into income.
                            </h2>
                            <p className="text-slate-400 mt-3 max-w-md leading-relaxed">
                                List your bike on Vrooom and earn while you're not riding.
                                We handle bookings, payments, and support.
                            </p>
                        </div>
                        <Link to="/host" className="shrink-0">
                            <button
                                id="host-cta-btn"
                                className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400
                                           text-white font-bold text-lg px-10 py-4 rounded-xl
                                           shadow-lg shadow-orange-500/30 transition-all duration-300
                                           hover:-translate-y-0.5 whitespace-nowrap"
                            >
                                Become a Host
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}