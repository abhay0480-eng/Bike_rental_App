import { Link, Outlet } from "react-router"

export const Host = () => {
    return (
        <div>
            <nav className=" flex gap-5 text-[#4D4D4D] text-base font-semibold">
                <Link to="/host">Dashboard</Link>
                <Link to="/bikes">Income</Link>
                <Link to="/host/bikes">Your Bikes</Link>
                <Link to="/host/reviews">Reviews</Link>
            </nav>
            <Outlet />
        </div>
    )
}