import { useEffect, useState } from "react"
import { NavLink, Outlet, useParams } from "react-router"
import { H2 } from "../../ui/typography/H2"
import { Chip } from "../../ui/sharedUiComponents/Chip"
import { Ptag } from "../../ui/typography/PTag"
import { ShimHostBikeDetailUI } from '../../ui/ShimmerUI/ShimHostBikeDetailUI'

interface Bike {
    id: string
    name: string
    imageUrl: string
    price: number
    type: string
    description: string
}

export const HostDetailBikes = () => {
    const param = useParams()  
    console.log("param", param.id)

    const [bikeDetail, setBikeDetail] = useState<Bike | null>(null)
    const [isLoading, setIsLoading] = useState(false)


    const getBikeDetail = async () => {
        try {
            setIsLoading(true)
            const reqBikeDetail = await fetch(`https://bike-rental-server-srsy.onrender.com/api/${param.id}`)
            const resBikeDetail = await reqBikeDetail.json()
            setBikeDetail(resBikeDetail[0])
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getBikeDetail()
    }, [])



    console.log("bikeDetail", bikeDetail)
    return (
        <div>
            <div className="p-10 my-5 border border-black rounded ">
                {!isLoading ? <div className="flex gap-5">
                    <img src={bikeDetail?.imageUrl} alt="" className="w-2xs drop-shadow-2xl rounded-2xl " />
                    <div>
                        <Chip variant={bikeDetail?.type}>{bikeDetail?.type}</Chip>
                        <H2 size="[26px]">{bikeDetail?.name}</H2>
                        <Ptag size="2xl">{bikeDetail?.price}</Ptag>
                    </div>
                </div> : <><ShimHostBikeDetailUI /></>}
                <div className="my-10">
                    <nav className=" flex gap-5 text-[#4D4D4D] text-base font-semibold">
                        <NavLink className={({ isActive }) => isActive ? "underline decoration-red-300 decoration-solid underline-offset-4 text-red-300  decoration-2 text-lg font-bold" : ""} to={`/host/bikes/${bikeDetail?.id}`} end={true}>Details</NavLink>
                        <NavLink className={({ isActive }) => isActive ? "underline decoration-red-300 decoration-solid underline-offset-4 text-red-300  decoration-2 text-lg font-bold" : ""} to={`/host/bikes/${bikeDetail?.id}/pricing`}>Pricing</NavLink>
                        <NavLink className={({ isActive }) => isActive ? "underline decoration-red-300 decoration-solid underline-offset-4 text-red-300  decoration-2 text-lg font-bold" : ""} to={`/host/bikes/${bikeDetail?.id}/photos`}>Photos</NavLink>
                    </nav>
                </div>
                <Outlet context={{ bikeDetail }} />

            </div>
        </div>
    )
}