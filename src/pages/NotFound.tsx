import { Button } from "../ui/sharedUiComponents/Button"
import { H2 } from "../ui/typography/H2"
import { Link } from "react-router"



export const NotFound = () => {
    return (
        <div className="flex justify-center items-center h-dvh">
            <div>
                <H2>Sorry, the page you were looking for was not found.</H2>
                <Link to='/'><Button>Return to Home</Button></Link>
            </div>

        </div>
    )
}