import { useEffect, useState } from "react"
import { Link } from "react-router"
import { H2 } from "../../ui/typography/H2"
import { Ptag } from "../../ui/typography/PTag"
import { ShimHostBikesUI } from "../../ui/ShimmerUI/ShimHostBikesUI"

interface Bike {
    id: string
    name: string
    imageUrl: string
    price: number
    type: string
    description: string
}

export const Dashboard = () => {
    const [hostBikeList, setHostBikeList] = useState<Bike[]>([])
    const [isLoading, setIsLoading] = useState(false)


    const getHostBikes = async () => {
        try {
            setIsLoading(true)
            const reqHostBikes = await fetch("https://bike-rental-server-srsy.onrender.com/api/host/bikes/123")
            const resHostBikes = await reqHostBikes.json()
            setHostBikeList(resHostBikes)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getHostBikes()
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
        <div className="my-10">
            <H2 size="4xl">Welcome Abhay!</H2>
            <div className=" flex gap-5 my-5">
                <div className="bg-[#FFEAD0] p-10 min-w-md rounded-2xl flex flex-col gap-5">
                    <h3 className="text-[#4D4D4D] text-base font-medium">Income Last 30 Days</h3>
                    <p className="text-5xl font-extrabold">₹2,260</p>
                    <Link to="#" className="text-right">Details</Link>
                </div>
                <div className="bg-[#FFEAD0] p-10 min-w-md rounded-2xl flex flex-col gap-5">
                    <h3 className="text-[#4D4D4D] text-base font-medium">Review Score</h3>
                    <p className="text-5xl font-extrabold">5.0/ 5</p>
                    <Link to="#" className="text-right">Details</Link>
                </div>
            </div>

            <div className="p-5 border border-gray-300 rounded my-10">
                <div className="flex justify-between items-center my-3">
                    <h3>Your listed Bikes</h3>
                    <p>View All</p>
                </div>
                {isLoading ? <><ShimHostBikesUI /></> : <>{displayHostBikesList}</>}
            </div>

        </div>
    )
}