import { Outlet } from "react-router-dom";
import {Header} from "./Header";
import {Footer} from "./Footer";
import { useUserContext } from "../contexts/UserContext";

export const GuestLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}