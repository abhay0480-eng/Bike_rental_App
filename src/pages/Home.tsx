import { Link } from "react-router"

export const Home = () => {
    return (
        <>
            <div className="relative bg-[url('https://res.cloudinary.com/dguqivg6t/image/upload/samples/bikes/ChatGPT_Image_Apr_27_2026_10_47_24_PM_ensrh8.png')] h-[85vh] bg-right  bg-cover flex justify-center items-center">

                <div className="absolute inset-0 bg-black/50"></div>
                <div >
                    <h1 className="relative z-10 text-4xl  md:text-6xl xl:8xl font-extrabold text-white text-center px-4">
                        You got the travel plans, we got the travel bikes.
                    </h1>
                    <Link to='/bikes' >
                        <div className="flex justify-center items-center">

                            <button className="relative bg-[#FF8C38] py-5 w-[70%] rounded-2xl my-20 px-20 text-base font-bold text-white cursor-pointer" >Find your Bike</button>
                        </div>
                    </Link>

                </div>



            </div>
        </>
    )
}