import { useEffect, useState } from "react"
import { Button } from "../ui/sharedUiComponents/Button"
import { H2 } from "../ui/typography/H2"
import { Link } from "react-router"


export const Bikes = () => {
    const [bikesData, setBikesData] = useState([])

    const getBikesData = async () => {
        try {
            const reqBikesData = await fetch("https://bike-rental-server-srsy.onrender.com/api")
            const resBikesData = await reqBikesData.json()
            setBikesData(resBikesData)
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getBikesData()
    }, [])

    const bikeListing = bikesData.map((bike) => {
        return (
            <Link to={`/bikes/${bike.id}`}>
                <div>
                    <img src={bike.imageUrl} alt={bike.name} className="rounded-xl" />
                    <div className="my-2 flex justify-between items-center">
                        <h3>{bike.name}</h3>
                        <p>₹{bike.price} /day</p>
                    </div>
                    <Button>{bike.type}</Button>
                </div>
            </Link>
        )
    })

    console.log("bikesData", bikesData)
    return (
        <div className="p-10 my-5">
            <H2>Explore our Bikes and Scooty options</H2>
            <div className="flex items-center gap-3 my-5">
                <Button>Simple</Button>
                <Button>Luxury</Button>
                <Button>Rugged</Button>
            </div>

            <div className="grid gri-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {bikeListing}
            </div>
        </div>
    )
}