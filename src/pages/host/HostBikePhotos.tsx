import { useOutletContext } from "react-router"
import type { Bike } from "../../api/type"



export const HostBikePhotos = () => {
    const { bikeDetail } = useOutletContext<{ bikeDetail: Bike | null }>()
    return (
        <div>
            <img src={bikeDetail?.imageUrl} alt="" className="w-16" />
        </div>
    )
}