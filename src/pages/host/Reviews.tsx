import { Star } from "lucide-react"
import { H2 } from "../../ui/typography/H2"
import { Ptag } from "../../ui/typography/PTag"


export const Reviews = () => {
    return (
        <div>
            <div className="flex gap-5 items-center">
                <H2>Your reviews</H2>
                <Ptag>last 30 days</Ptag>
            </div>
            <div className="flex gap-5 items-center">
                <H2>5.0</H2>
                <Star />
                <Ptag>overall rating</Ptag>
            </div>
            <div>
                <div className=" w-[35%] gap-2 flex justify-between items-center">
                    <p className="text-nowrap">5 star</p>
                    <div className="w-full h-3 bg-gray-300 relative rounded-2xl">
                        <div className="h-3 bg-[#FF8C38] w-[90%] rounded-2xl"></div>
                    </div>
                    <Ptag>90%</Ptag>
                </div>
                <div className=" w-[35%] gap-2 flex justify-between items-center">
                    <p className="text-nowrap">4 star</p>
                    <div className="w-full h-3 bg-gray-300 relative rounded-2xl">
                        <div className="h-3 bg-[#FF8C38] w-[70%] rounded-2xl"></div>
                    </div>
                    <Ptag>70%</Ptag>
                </div>
                <div className=" w-[35%] gap-2 flex justify-between items-center">
                    <p className="text-nowrap">3 star</p>
                    <div className="w-full h-3 bg-gray-300 relative rounded-2xl">
                        <div className="h-3 bg-[#FF8C38] w-[10%] rounded-2xl"></div>
                    </div>
                    <Ptag>10%</Ptag>
                </div>
                <div className=" w-[35%] gap-2 flex justify-between items-center">
                    <p className="text-nowrap">2 star</p>
                    <div className="w-full h-3 bg-gray-300 relative rounded-2xl">
                        <div className="h-3 bg-[#FF8C38] w-[50%] rounded-2xl"></div>
                    </div>
                    <Ptag>50%</Ptag>
                </div>
                <div className=" w-[35%] gap-2 flex justify-between items-center">
                    <p className="text-nowrap">1 star</p>
                    <div className="w-full h-3 bg-gray-300 relative rounded-2xl">
                        <div className="h-3 bg-[#FF8C38] w-[20%] rounded-2xl"></div>
                    </div>
                    <Ptag>20%</Ptag>
                </div>
            </div>
            <div>
                <H2>Reviews (2)</H2>
                <div>
                    <div className="flex gap-3">
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                    </div>

                    <div className="flex gap-2 items-center">
                        <H2 size="sm">Elliot</H2>
                        <Ptag color="[#8C8C8C]">December 1, 2022</Ptag>
                    </div>
                    <Ptag>The beach bum is such as awesome van! Such as comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!</Ptag>
                </div>
                <div>
                    <div className="flex gap-3">
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                    </div>

                    <div className="flex gap-2 items-center">
                        <H2 size="sm">Sandy</H2>
                        <Ptag color="[#8C8C8C]">December 1, 2022</Ptag>
                    </div>
                    <Ptag>TThis is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!</Ptag>
                </div>
            </div>
        </div>
    )
}