import { Link } from "react-router"
import { H2 } from "../ui/typography/H2"
import { Ptag } from "../ui/typography/PTag"
import { Button } from "../ui/sharedUiComponents/Button"

export const About = () => {
    return (
        <div className="pb-10">
            <div className="">
                <img className="h-96 w-full object-cover" src="https://res.cloudinary.com/dguqivg6t/image/upload/samples/bikes/ChatGPT_Image_Apr_28_2026_01_05_21_PM_czbzas.png" alt="about hero image" />
            </div>
            <div className="w-4/5 mx-auto text-center">
                <H2>Don't hail a cab when you could ride a bike.

                    Our mission is to give every tourist in India the freedom to explore at their own pace. Every bike is serviced before each rental to keep your adventure on track.</H2>

                <Ptag >Our team are passionate riders who've covered Ladakh, Spiti, and Coorg — and they're here to help you do the same.</Ptag>

                <div className="bg-[#FFCC8D] w-full rounded p-10 text-left">
                    <h2 className="text-2xl font-bold text-[#161616]">Your destination is waiting.
                        Your van is ready.</h2>
                    <Link to='/bikes'>
                        <Button bgBtnColor="[#161616]" btnWidth="64" >Explore our Bikes</Button>
                    </Link>
                </div>
            </div>

        </div>
    )
}