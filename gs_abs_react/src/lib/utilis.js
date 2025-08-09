import clsx from "clsx";
import { redirect } from "react-router-dom";
import { twMerge } from "tailwind-merge"

export const cn = (...inputs) => {
    return twMerge(clsx(inputs))
};

export const checkAuth = (request, role) => {
    const pathName = new URL(request.url).pathname;
    //const isLogged = localStorage.getItem("isloggedin");
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem('user'));
    if(!token || !user ){
        throw redirect(`/login?message=vous devez se connecter&redirectTo=${pathName}`);
    }
    if(role !== user.role) {
        throw redirect("/unauthorized");
    }
    return {user, token};
}

