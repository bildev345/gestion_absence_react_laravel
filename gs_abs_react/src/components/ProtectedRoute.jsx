import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({children}){
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    return token ? children : navigate('/login');
}