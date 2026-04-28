import { useEffect, useState } from "react"
import { Link } from "react-router"

interface Bike {
    id: string
    name: string
    imageUrl: string
    price: number
    type: string
    description: string
}

export const HostBikes = () => {
    const [hostBikeList, setHostBikeList] = useState<Bike[]>([])

    const getHostBikes = async () => {
        try {
            const reqHostBikes = await fetch("https://bike-rental-server-srsy.onrender.com/api")
            const resHostBikes = await reqHostBikes.json()
            setHostBikeList(resHostBikes)
        } catch (error) {
            console.log(error)
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
                            <h3>₹{bike.price}/day</h3>
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
                <h3>Your listed Bikes</h3>
                <p>View All</p>
            </div>
            {displayHostBikesList}
        </div>
    )
}