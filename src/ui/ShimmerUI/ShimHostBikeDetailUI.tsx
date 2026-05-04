/* Shimmer for host bike detail header card */
export const ShimHostBikeDetailUI = () => (
    <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* thumbnail */}
        <div className="w-full sm:w-36 h-36 rounded-xl bg-slate-200 animate-pulse shrink-0" />
        {/* info */}
        <div className="flex flex-col gap-3 flex-1">
            <div className="h-5  w-16 bg-slate-200 animate-pulse rounded-full" />
            <div className="h-6  w-3/5 bg-slate-200 animate-pulse rounded" />
            <div className="h-4  w-1/4 bg-slate-200 animate-pulse rounded" />
        </div>
    </div>
)