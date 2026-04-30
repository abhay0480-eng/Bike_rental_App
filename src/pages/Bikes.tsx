import { useEffect, useState } from "react"
import { Button } from "../ui/sharedUiComponents/Button"
import { H2 } from "../ui/typography/H2"
import { Link } from "react-router"
import { Chip } from "../ui/sharedUiComponents/Chip"
import { ShimBikesListing } from "../ui/ShimmerUI/ShimBikesListing"

interface Bike {
    id: string
    name: string
    imageUrl: string
    price: number
    type: string
}

export const Bikes = () => {
    const [bikesData, setBikesData] = useState<Bike[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const getBikesData = async () => {
        try {
            setIsLoading(true)
            const reqBikesData = await fetch("https://bike-rental-server-srsy.onrender.com/api")
            const resBikesData = await reqBikesData.json()
            setBikesData(resBikesData)
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getBikesData()
    }, [])

    const bikeListing = bikesData.map((bike) => {
        return (
            <>
                <Link to={`/bikes/${bike.id}`} key={bike?.id}>
                <div>
                    <img src={bike.imageUrl} alt={bike.name} className="rounded-xl drop-shadow-2xl" />
                    <div className="my-2 flex justify-between items-center">
                        <h3>{bike.name}</h3>
                        <p>₹{bike.price} /day</p>
                    </div>
                        <Chip variant={bike.type}>
                            {bike.type}
                        </Chip>
                </div>
                </Link> 
            </>
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
                {isLoading ? <><ShimBikesListing /></> : <>{bikeListing}</>}
            </div>
        </div>
    )
}