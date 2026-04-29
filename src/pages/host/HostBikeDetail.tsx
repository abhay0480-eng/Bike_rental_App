import { useOutletContext } from "react-router"
interface Bike {
    id: string
    name: string
    imageUrl: string
    price: number
    type: string
    description: string
}


export const HostBikeDetail = () => {
    const { bikeDetail } = useOutletContext<{ bikeDetail: Bike | null }>()

    console.log("bikeDetail", bikeDetail)
    return (
        <div>
            {bikeDetail?.description}
        </div>
    )
}