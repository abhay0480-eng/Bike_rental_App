import { useOutletContext } from "react-router"
interface Bike {
    id: string
    name: string
    imageUrl: string
    price: number
    type: string
    description: string
}


export const HostBikePricing = () => {
    const { bikeDetail } = useOutletContext<{ bikeDetail: Bike | null }>()
    return (
        <div>
            {bikeDetail?.price}
        </div>
    )
}