import { useEffect, useState } from "react"
import { Link } from "react-router"
import { H2 } from "../../ui/typography/H2"
import { Ptag } from "../../ui/typography/PTag"
import { ShimHostBikesUI } from "../../ui/ShimmerUI/ShimHostBikesUI"
import { getHostBikes } from "../../api/bikes"
import type { Bike } from "../../api/type"



export const HostBikes = () => {
    const [hostBikeList, setHostBikeList] = useState<Bike[]>([])
    const [isLoading, setIsLoading] = useState(false)


    const getHostBike = async () => {
        try {
            setIsLoading(true)
            const data = await getHostBikes()
            setHostBikeList(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getHostBike()
    }, [])

    const displayHostBikesList = hostBikeList.map((bike) => {
        return (
            <Link key={bike.id} to={`/host/bikes/${bike.id}`}>
                <div className="bg-[#FFEAD0] w-full p-5 flex justify-between items-center my-5 rounded">
                    <div className="flex gap-4">
                        <img src={bike.imageUrl} alt="" className="w-16 h-16 rounded" />
                        <div className="">
                            <h3 className="text-xl font-semibold text-[#161616]">{bike.name}</h3>
                            <Ptag color="[#4D4D4D]">₹{bike.price}/day</Ptag>
                        </div>
                    </div>
                    <div>
                        <p>Edit</p>
                    </div>
                </div>
            </Link>
        )
    })

    return (
        <div className="p-5  my-10">
            <div className="flex justify-between items-center my-3">
                <H2>Your listed Bikes</H2>
                <p>View All</p>
            </div>
            {displayHostBikesList}
            {isLoading ? <><ShimHostBikesUI /></> : <>{displayHostBikesList}</>}
        </div>
    )
}