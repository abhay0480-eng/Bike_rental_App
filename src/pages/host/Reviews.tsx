import { Star } from "lucide-react"

const RATINGS = [
    { stars: 5, pct: 90 },
    { stars: 4, pct: 70 },
    { stars: 3, pct: 10 },
    { stars: 2, pct: 50 },
    { stars: 1, pct: 20 },
]

const REVIEWS = [
    {
        id: 1,
        name: "Elliot",
        date: "December 1, 2022",
        rating: 5,
        text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very understanding. Highly recommend!",
    },
    {
        id: 2,
        name: "Sandy",
        date: "December 1, 2022",
        rating: 5,
        text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
    },
]

const StarRow = ({ filled }: { filled: boolean }) => (
    <Star
        className={`w-4 h-4 ${filled ? "fill-orange-400 text-orange-400" : "text-slate-200 fill-slate-200"}`}
    />
)

export const Reviews = () => (
    <div className="flex flex-col gap-8">

        {/* ── header ── */}
        <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Reviews</h1>
            <p className="text-slate-500 text-sm mt-0.5">Last 30 days</p>
        </div>

        {/* ── score summary ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6
                        grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* big score */}
            <div className="flex flex-col items-center sm:items-start gap-2">
                <p className="text-6xl font-extrabold text-slate-800">5.0</p>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <StarRow key={s} filled />
                    ))}
                </div>
                <p className="text-slate-400 text-sm">Overall rating</p>
            </div>

            {/* breakdown bars */}
            <div className="flex flex-col gap-2.5">
                {RATINGS.map(({ stars, pct }) => (
                    <div key={stars} className="flex items-center gap-3">
                        <span className="text-slate-500 text-xs w-10 shrink-0 text-right">
                            {stars}★
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-2 bg-orange-400 rounded-full transition-all duration-500"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                        <span className="text-slate-400 text-xs w-8 shrink-0">{pct}%</span>
                    </div>
                ))}
            </div>
        </div>

        {/* ── individual reviews ── */}
        <div className="flex flex-col gap-4">
            <h2 className="font-bold text-slate-700 text-sm">
                Reviews ({REVIEWS.length})
            </h2>
            {REVIEWS.map(({ id, name, date, rating, text }) => (
                <div
                    key={id}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
                >
                    {/* stars */}
                    <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <StarRow key={s} filled={s <= rating} />
                        ))}
                    </div>

                    {/* reviewer */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500 text-white
                                        flex items-center justify-center text-xs font-bold shrink-0">
                            {name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 text-sm">{name}</p>
                            <p className="text-slate-400 text-xs">{date}</p>
                        </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                </div>
            ))}
        </div>
    </div>
)