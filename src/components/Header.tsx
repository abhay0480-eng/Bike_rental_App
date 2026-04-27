
import { Link } from "react-router";
import Logo from '../assets/logo.png'

export const Header = () => {

    return (
        <div className="flex justify-between items-center py-5 px-10 bg-[#FFF7ED]">
            <div className="w-52 ">
                <Link to='/'><img src={Logo} alt="" className="max-h-24" /></Link>
            </div>
            <nav className=" flex gap-5 text-[#4D4D4D] text-base font-semibold">
                <Link to="/about">About</Link>
                <Link to="/bikes">Bikes</Link>
                <Link to="/host">Host</Link>
                <Link to="/login">Login</Link>
            </nav>
        </div>
    )

}