
import { Link, NavLink } from "react-router";
import {
    Bike,
} from 'lucide-react';

export const Header = () => {

    return (
        <div className="flex justify-between items-center py-5 px-10 bg-[#FFF7ED]">
            <Link to="/">
                <div className="flex items-center gap-2">
                    <div className="bg-yellow-400 p-2 rounded-xl">
                        <Bike className="w-6 h-6 text-slate-900" />
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">Vrooom</span>
                </div>
            </Link>

            <nav className=" flex gap-5 text-[#4D4D4D] text-base font-semibold">
                <NavLink
                    className={({ isActive }) => isActive ? "underline decoration-red-300 decoration-solid underline-offset-4 text-red-300  decoration-2 text-lg font-bold" : ""} to="/about">
                    About
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "underline decoration-red-300 decoration-solid underline-offset-4 text-red-300  decoration-2 text-lg font-bold" : ""} to="/bikes">Bikes</NavLink>
                <NavLink className={({ isActive }) => isActive ? "underline decoration-red-300 decoration-solid underline-offset-4 text-red-300  decoration-2 text-lg font-bold" : ""} to="/host">Host</NavLink>
                <NavLink className={({ isActive }) => isActive ? "underline decoration-red-300 decoration-solid underline-offset-4 text-red-300  decoration-2 text-lg font-bold" : ""} to="/login">Login</NavLink>
            </nav>
        </div>
    )

}