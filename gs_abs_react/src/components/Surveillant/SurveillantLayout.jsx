import { Outlet } from "react-router-dom";
import {SurveillantHeader} from "./SurveillantHeader";
import { Footer } from "../Footer";
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