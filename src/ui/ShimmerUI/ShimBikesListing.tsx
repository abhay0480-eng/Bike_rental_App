

export const ShimBikesListing = () => {
    return (
        <>
            {[...Array(10)].map((_, index) => {
                return (<div className="animate-pulse">
                    <div className="rounded-xl w-full h-80 bg-gray-200  "> </div>
                    <div className="my-2 flex justify-between items-center ">
                        <div className="px-10 py-4 bg-gray-200 rounded"></div>
                        <div className="px-10 py-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="px-12 w-3xs py-5 bg-gray-200 rounded"></div>

                </div>)
            })}
        </>

    )
}