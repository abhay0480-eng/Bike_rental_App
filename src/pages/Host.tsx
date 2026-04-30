import { NavLink, Outlet } from "react-router"

export const Host = () => {
    return (
        <div className="px-10">
            <nav className=" flex gap-5 text-[#4D4D4D] text-base font-semibold my-5">
                <NavLink className={({ isActive }) => isActive ? "underline decoration-red-300 decoration-solid underline-offset-4 text-red-300  decoration-2 text-lg font-bold" : ""} to="/host" end={true}>Dashboard</NavLink>
                <NavLink className={({ isActive }) => isActive ? "underline decoration-red-300 decoration-solid underline-offset-4 text-red-300  decoration-2 text-lg font-bold" : ""} to="/host/income">Income</NavLink>
                <NavLink className={({ isActive }) => isActive ? "underline decoration-red-300 decoration-solid underline-offset-4 text-red-300  decoration-2 text-lg font-bold" : ""} to="/host/bikes">Your Bikes</NavLink>
                <NavLink className={({ isActive }) => isActive ? "underline decoration-red-300 decoration-solid underline-offset-4 text-red-300  decoration-2 text-lg font-bold" : ""} to="/host/reviews">Reviews</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}