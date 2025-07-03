import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RoleRoute({allowed, children}){
    const {user} = useSelector(state => state.auth.user);
    return allowed.includes(user?.role)
    ? children : <Navigate to="/unauthorized" replace/>
}