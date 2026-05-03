import { useOutletContext } from "react-router"
import type { Bike } from "../../api/type"



export const HostBikePricing = () => {
    const { bikeDetail } = useOutletContext<{ bikeDetail: Bike | null }>()
    return (
        <div>
            {bikeDetail?.price}
        </div>
    )
}