import { useOutletContext } from "react-router"

interface Bike {
    id: string
    name: string
    imageUrl: string
    price: number
    type: string
    description: string
}


export const HostBikePhotos = () => {
    const { bikeDetail } = useOutletContext<{ bikeDetail: Bike | null }>()
    return (
        <div>
            <img src={bikeDetail?.imageUrl} alt="" className="w-16" />
        </div>
    )
}