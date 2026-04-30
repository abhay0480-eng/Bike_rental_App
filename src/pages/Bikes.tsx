import { useEffect, useState } from "react"
import { Button } from "../ui/sharedUiComponents/Button"
import { H2 } from "../ui/typography/H2"
import { Link, useSearchParams } from "react-router"
import { Chip } from "../ui/sharedUiComponents/Chip"
import { ShimBikesListing } from "../ui/ShimmerUI/ShimBikesListing"
import { Ptag } from "../ui/typography/PTag"

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
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get("type")
    console.log("type", type)

    const getBikesData = async () => {
        const typeData = type ? `?type=${type}` : ""
        try {
            setIsLoading(true)
            const reqBikesData = await fetch(`https://bike-rental-server-srsy.onrender.com/api${typeData}`)
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
    }, [type])

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

    const handleClearFilter = () => {
        setSearchParams({})
    }



    return (
        <div className="p-10 my-5">
            <H2>Explore our Bikes and Scooty options</H2>
            <div className="flex items-center gap-3 my-5">
                <Button btnBorder={type === "simple" ? "[#FF8C38]" : ""} bgBtnColor={type === "simple" ? "[#FFCC8D]" : "[#FFEAD0]"} onClick={() => setSearchParams({ type: "simple" })} btnTextColor="[#4D4D4D]" btnWidth="md">Simple</Button>

                <Button btnBorder={type === "luxury" ? "[#FF8C38]" : ""} bgBtnColor={type === "luxury" ? "[#FFCC8D]" : "[#FFEAD0]"} onClick={() => setSearchParams({ type: "luxury" })} btnTextColor="[#4D4D4D]" btnWidth="md">Luxury</Button>

                <Button btnBorder={type === "rugged" ? "[#FF8C38]" : ""} bgBtnColor={type === "rugged" ? "[#FFCC8D]" : "[#FFEAD0]"} onClick={() => setSearchParams({ type: "rugged" })} btnTextColor="[#4D4D4D]" btnWidth="md">Rugged</Button>
                <Ptag underLine="true" onClick={handleClearFilter}>Clear filters</Ptag>
            </div>
            <div className="grid gri-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
                {isLoading ? <><ShimBikesListing /></> : <>{bikeListing}</>}
            </div>
        </div>
    )
}