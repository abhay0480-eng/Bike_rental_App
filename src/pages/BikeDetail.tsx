import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Button } from "../ui/sharedUiComponents/Button"
import { H2 } from "../ui/typography/H2"


export const BikeDetail = () => {

    const param = useParams()
    console.log("param", param.id)

    const [bikeDetail, setBikeDetail] = useState(null)

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
                <Button>{bikeDetail?.type}</Button>
            </div>
            <H2>{bikeDetail?.name}</H2>
            <p className="font-bold text-2xl">${bikeDetail?.price}/day</p>
            <p className="text-base font-medium">{bikeDetail?.description}</p>
            <button className="relative bg-[#FF8C38] py-5  rounded-2xl  px-20 text-base font-bold text-white cursor-pointer" >Rent this Bike</button>
        </div>
    )
}