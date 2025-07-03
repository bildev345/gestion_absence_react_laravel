import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();
    setTimeout(() => {
        navigate(-1);
    }, 1500);
    
    return (
        <h1>Ressource introuvable</h1>
    )
}