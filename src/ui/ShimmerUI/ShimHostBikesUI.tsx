export const ShimHostBikesUI = () => {
    return (
        <>
            {[...Array(10)].map((_, index) => (
                <div key={index} className="">
                    <div className="bg-[#FFEAD0] w-full p-5 flex justify-between items-center my-5 rounded">
                        <div className="flex gap-4">
                            <div className="w-16 h-16 bg-gray-200 animate-pulse rounded"></div>
                            <div className="">
                                <div className="px-5 py-2 w-12 my-4 animate-pulse bg-gray-200 rounded"></div>
                                <div className="px-5 py-2 w-12 animate-pulse bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div>
                            <p>Edit</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};