import { Link, Outlet } from "react-router"

export const Host = () => {
    return (
        <div className="px-10">
            <nav className=" flex gap-5 text-[#4D4D4D] text-base font-semibold my-5">
                <Link to="/host">Dashboard</Link>
                <Link to="/host/income">Income</Link>
                <Link to="/host/bikes">Your Bikes</Link>
                <Link to="/host/reviews">Reviews</Link>
            </nav>
            <Outlet />
        </div>
    )
}