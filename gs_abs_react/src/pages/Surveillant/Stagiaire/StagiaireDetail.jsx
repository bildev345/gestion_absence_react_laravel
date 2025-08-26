import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"
import { getStagiaire } from "../../../api/Stagiaires";

export const StagiaireDetail = () => {
    const {id} = useParams();
    const {data , isLoading, isError, error} = useQuery({
        queryKey : ['stagiaire', id],
        queryFn : () => getStagiaire(id)
    })
    console.log(data);
    if(isError){
        return <h4>Error survenue : {error.message}</h4>
    }
    if(isLoading){
        return <h4>Loading...</h4>
    }
    return (
        <div>
            <Link 
                to=".."
                relative="path"
                className="text-gray-800 dark:text-gray-50 underline"
            >
                &larr; Back to Stagiaires
            </Link>
        
            <div>
                <h2>{data.stagiaire.CEF}</h2>
                <h2>{data.stagiaire.nom}</h2>
                <h2>{data.stagiaire.prenom}</h2>
            </div>
        
            
        </div>
    )
}