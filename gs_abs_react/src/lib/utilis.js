import clsx from "clsx";
import { redirect } from "react-router-dom";
import { twMerge } from "tailwind-merge"

export const cn = (...inputs) => {
    return twMerge(clsx(inputs))
};

export const checkAuth = ({request}) => {
    const pathName = new URL(request.url).pathname;
    const isLogged = localStorage.getItem("isloggedin");
    if(!isLogged){
        throw redirect(`/login?message=vous devez se connecter&redirectTo=${pathName}`);
    }
    return null;
}