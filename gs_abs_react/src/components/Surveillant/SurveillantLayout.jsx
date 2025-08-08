import { Outlet } from "react-router-dom";
import {SurveillantHeader} from "./SurveillantHeader";
import { Footer } from "../Footer";
import { checkAuth } from "../../lib/utilis";

export const loader = ({request}) => {
    return checkAuth(request, "surveillant");
}
export const SurveillantLayout = () => {
    return (
        <div>
            <SurveillantHeader/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}