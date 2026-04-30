import { useOutletContext } from "react-router"
import { Ptag } from "../../ui/typography/PTag"
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
    return (
        <div className="flex gap-3 items-start">
            <span className="text-base font-bold text-[#161616] my-3 ">Description:</span> <Ptag> {bikeDetail?.description}</Ptag>
        </div>
    )
}