import { useEffect, useState } from "react"
import { Button } from "../ui/sharedUiComponents/Button"
import { H2 } from "../ui/typography/H2"
import { Link } from "react-router"

interface Bike {
    id: string
    name: string
    imageUrl: string
    price: number
    type: string
}

export const Bikes = () => {
    const [bikesData, setBikesData] = useState<Bike[]>([])

    const getBikesData = async () => {
        try {
            const reqBikesData = await fetch("https://bike-rental-server-srsy.onrender.com/api")
            const resBikesData = await reqBikesData.json()
            setBikesData(resBikesData)
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error))
        }
    }

    useEffect(() => {
        getBikesData()
    }, [])

    const bikeListing = bikesData.map((bike) => {
        return (
            <Link to={`/bikes/${bike.id}`} key={bike.id}>
                <div>
                    <img src={bike.imageUrl} alt={bike.name} className="rounded-xl drop-shadow-2xl" />
                    <div className="my-2 flex justify-between items-center">
                        <h3>{bike.name}</h3>
                        <p>₹{bike.price} /day</p>
                    </div>
                    <Button>{bike.type}</Button>
                </div>
            </Link>
        )
    })

    return (
        <div className="p-10 my-5">
            <H2>Explore our Bikes and Scooty options</H2>
            <div className="flex items-center gap-3 my-5">
                <Button>Simple</Button>
                <Button>Luxury</Button>
                <Button>Rugged</Button>
            </div>

            <div className="grid gri-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
                {bikeListing}
            </div>
        </div>
    )
}