import clsx from "clsx";
import { redirect } from "react-router-dom";
import { twMerge } from "tailwind-merge"
import { getUser } from "../api/auth";

export const cn = (...inputs) => {
    return twMerge(clsx(inputs))
};

export const checkAuth = async (request, role) => {
    const pathName = new URL(request.url).pathname;
    const token = localStorage.getItem("token");
    const user = await getUser();
    if(!token || !user ){
        throw redirect(`/login?message=vous devez se connecter&redirectTo=${pathName}`);
    }
    if(role !== user.role) {
        throw redirect("/unauthorized");
    }
    return {user, token};
}

