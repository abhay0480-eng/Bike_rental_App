import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Button } from "../ui/sharedUiComponents/Button"
import { H2 } from "../ui/typography/H2"
import { Ptag } from "../ui/typography/PTag"
import { Chip } from "../ui/sharedUiComponents/Chip"

interface Bike {
    id: string
    name: string
    imageUrl: string
    price: number
    type: string
    description: string
}

export const BikeDetail = () => {

    const param = useParams()
    console.log("param", param.id)

    const [bikeDetail, setBikeDetail] = useState<Bike | null>(null)

    const getBikeDetail = async () => {
        try {
            const reqBikeDetail = await fetch(`https://bike-rental-server-srsy.onrender.com/api/${param.id}`)
            const resBikeDetail = await reqBikeDetail.json()
            setBikeDetail(resBikeDetail[0])
        } catch (error) {

        }
    }

    useEffect(() => {
        getBikeDetail()
    }, [])

    console.log("bikeDetail", bikeDetail)

    return (
        <div className="max-w-10/12 mx-auto overflow-hidden py-5 mb-5 flex flex-col gap-3">
            <div className="">
                <img src={bikeDetail?.imageUrl} alt="" className="w-lg my-10 rounded-2xl drop-shadow-xl" />
                <Chip variant={bikeDetail?.type}>{bikeDetail?.type}</Chip>
            </div>
            <H2>{bikeDetail?.name}</H2>
            <p className="font-bold text-2xl">${bikeDetail?.price}/day</p>
            <Ptag>{bikeDetail?.description}</Ptag>
            <button className="relative bg-[#FF8C38] py-5  rounded-2xl  px-20 text-base font-bold text-white cursor-pointer" >Rent this Bike</button>
        </div>
    )
}