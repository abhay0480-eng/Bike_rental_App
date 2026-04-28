
import { Link } from "react-router";
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
                <Link to="/about">About</Link>
                <Link to="/bikes">Bikes</Link>
                <Link to="/host">Host</Link>
                <Link to="/login">Login</Link>
            </nav>
        </div>
    )

}