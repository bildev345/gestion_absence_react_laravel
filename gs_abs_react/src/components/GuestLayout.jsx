import { Outlet } from "react-router-dom";
import {Header} from "./Header";
import {Footer} from "./Footer";

export const GuestLayout = () => {
    return (
        <div className="flex flex-col min-h-dvh">
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}