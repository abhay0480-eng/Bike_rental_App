import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { H2 } from "../ui/typography/H2"
import { Ptag } from "../ui/typography/PTag"
import { Chip } from "../ui/sharedUiComponents/Chip"
import { ShimBikeDetail } from "../ui/ShimmerUI/ShimBikeDetail"
import { getBikeById } from '../api/bikes'
import type { Bike } from "../api/type"

export const BikeDetail = () => {
    const param = useParams()
    const [bikeDetail, setBikeDetail] = useState<Bike | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const getBikeDetail = async () => {
        if (!param.id) return

        try {
            setIsLoading(true)
            const data = await getBikeById(param.id as string)
            setBikeDetail(data)
        } catch (error) {
            console.error('Failed to fetch bike:', error)
            setBikeDetail(null)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getBikeDetail()
    }, [])

    return (
        <div className="max-w-10/12 mx-auto overflow-hidden py-5 mb-5 flex flex-col gap-3">
            {!isLoading ? (
                <>
                    <div className="">
                        <img src={bikeDetail?.imageUrl} alt="" className="w-lg my-10 rounded-2xl drop-shadow-xl" />
                        <Chip variant={bikeDetail?.type}>{bikeDetail?.type}</Chip>
                    </div>
                    <H2>{bikeDetail?.name}</H2>
                    <p className="font-bold text-2xl">${bikeDetail?.price}/day</p>
                    <Ptag>{bikeDetail?.description}</Ptag>
                    <button className="relative bg-[#FF8C38] py-5  rounded-2xl  px-20 text-base font-bold text-white cursor-pointer">
                        Rent this Bike
                    </button>
                </>
            ) : (
                <ShimBikeDetail />
            )}
        </div>
    )
}