/* Shimmer skeleton for the bike detail two-column layout */
export const ShimBikeDetail = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

        {/* image placeholder */}
        <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 animate-pulse" />

        {/* info column */}
        <div className="flex flex-col gap-4">
            {/* badge */}
            <div className="h-5 w-20 bg-slate-200 animate-pulse rounded-full" />
            {/* name */}
            <div className="h-8 w-3/4 bg-slate-200 animate-pulse rounded" />
            <div className="h-8 w-1/2 bg-slate-200 animate-pulse rounded" />
            {/* price */}
            <div className="h-10 w-1/3 bg-slate-200 animate-pulse rounded" />
            <hr className="border-slate-100" />
            {/* description lines */}
            <div className="space-y-2">
                <div className="h-3.5 w-full  bg-slate-200 animate-pulse rounded" />
                <div className="h-3.5 w-5/6  bg-slate-200 animate-pulse rounded" />
                <div className="h-3.5 w-4/6  bg-slate-200 animate-pulse rounded" />
            </div>
            {/* feature pills */}
            <div className="grid grid-cols-2 gap-3 mt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-10 bg-slate-200 animate-pulse rounded-xl" />
                ))}
            </div>
            {/* CTA button */}
            <div className="h-14 w-full bg-slate-200 animate-pulse rounded-xl mt-2" />
        </div>
    </div>
)