/* Shimmer skeleton for the bikes listing grid.
   Matches the new BikeCard layout: aspect-ratio image + info row */
export const ShimBikesListing = () => (
    <>
        {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                {/* image placeholder */}
                <div className="aspect-[4/3] bg-slate-200 animate-pulse" />

                {/* info placeholder */}
                <div className="p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                        <div className="h-4 w-3/5 bg-slate-200 animate-pulse rounded" />
                        <div className="h-5 w-12 bg-slate-200 animate-pulse rounded" />
                    </div>
                    <div className="h-3 w-1/3 bg-slate-200 animate-pulse rounded" />
                </div>
            </div>
        ))}
    </>
)