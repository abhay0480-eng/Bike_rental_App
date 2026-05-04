import { useOutletContext } from "react-router"
import type { Bike } from "../../api/type"

export const HostBikeDetail = () => {
    const { bikeDetail } = useOutletContext<{ bikeDetail: Bike | null }>()

    if (!bikeDetail) {
        return <p className="text-slate-400 text-sm">Loading bike details…</p>
    }

    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-bold text-slate-700 text-sm">Description</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
                {bikeDetail.description}
            </p>

            {bikeDetail.hostedBy && (
                <div className="mt-2 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 mb-1">Hosted by</p>
                    <p className="text-sm font-semibold text-slate-700">
                        {bikeDetail.hostedBy}
                    </p>
                </div>
            )}
        </div>
    )
}