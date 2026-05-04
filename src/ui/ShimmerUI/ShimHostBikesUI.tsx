/* Shimmer for host bikes list — matches the new BikeRow layout */
export const ShimHostBikesUI = ({ count = 5 }: { count?: number }) => (
    <>
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
                {/* thumbnail */}
                <div className="w-14 h-14 rounded-xl bg-slate-200 animate-pulse shrink-0" />
                {/* text */}
                <div className="flex-1 flex flex-col gap-2">
                    <div className="h-3.5 w-2/5 bg-slate-200 animate-pulse rounded" />
                    <div className="h-3   w-1/4 bg-slate-200 animate-pulse rounded" />
                </div>
                {/* chip placeholder */}
                <div className="hidden sm:block h-5 w-16 bg-slate-200 animate-pulse rounded-full shrink-0" />
            </div>
        ))}
    </>
)