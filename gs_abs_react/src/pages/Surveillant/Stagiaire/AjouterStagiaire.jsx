import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchGroupes } from "../../../api/Groupe";
import { addStagiaire } from "../../../api/Stagiaires";
import {cn} from '../../../lib/utilis.js';
import { useNavigate } from "react-router-dom";

export const AjouterStagiaire = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {data : groupes} = useQuery({
    queryKey : ['groupes'],
    queryFn : fetchGroupes,
    staleTime : 10000,
    gcTime : 20000,
    refetchOnWindowFocus : false
  });

  const {
    data: responseData,
    mutate,
    error,
    isPending,
  } = useMutation({
    mutationFn: addStagiaire,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({queryKey : ['stagiaires']});
      navigate("..", {
        relative : "path",
        state : data.message,
      });  
    }
  });
  

  const [formData, setFormData] = useState({
    CEF : '',
    nom : '',
    prenom : '',
    date_naissance : '',
    groupe_id : groupes?.[0].id || ''
  });


  const handleCreate = (e) => {
      e.preventDefault();
      mutate(formData);
  }
  const handleChange = (e) => {
    setFormData(prev => {
      return {
        ...prev, [e.target.name] : e.target.value
      }
    });
  }
  if(error){
     console.log(error.message);
  }
    return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="font-bold text-center text-2xl text-gray-800 dark:text-gray-50 mb-6">
        Créer un Nouveau Stagiaire
      </h1>
      
      <form onSubmit={handleCreate} className="space-y-6">
        <div className="relative z-0 w-full group">
          <input
            type="text"
            id="CEF"
            name="CEF"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.CEF}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="CEF"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            CEF
          </label>
          {error?.message?.CEF && (
            <span className="text-sm text-red-600 dark:text-red-400 mt-1 block">
              {error.message.CEF[0]}
            </span>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full group">
            <input
              type="text"
              id="prenom"
              name="prenom"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={formData.prenom}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label
              htmlFor="prenom"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Prènom
            </label>
            {error?.message?.prenom && (
              <span className="text-sm text-red-600 dark:text-red-400 mt-1 block">
                {error.message.prenom[0]}
              </span>
            )}
          </div>
          
          <div className="relative z-0 w-full group">
            <input
              type="text"
              id="nom"
              name="nom"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={formData.nom}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label
              htmlFor="nom"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nom
            </label>
            {error?.message?.nom && (
              <span className="text-sm text-red-600 dark:text-red-400 mt-1 block">
                {error.message.nom[0]}
              </span>
            )}
          </div>
        </div>
        
        <div className="relative z-0 w-full group">
          <label htmlFor="date_naissance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date de naissance
          </label>
          <input
            type="date"
            id="date_naissance"
            name="date_naissance"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            value={formData.date_naissance}
            onChange={handleChange}
            required
          />
          {error?.message?.date_naissance && (
            <span className="text-sm text-red-600 dark:text-red-400 mt-1 block">
              {error.message.date_naissance[0]}
            </span>
          )}
        </div>
        
        <div className="relative z-0 w-full group">
          <label htmlFor="groupe_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Groupe
          </label>
          <select
            id="groupe_id"
            name="groupe_id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.groupe_id}
            onChange={handleChange}
            required
          >
            {groupes?.map(groupe => (
              <option key={groupe.id} value={groupe.id}>
                {groupe.intitule}
              </option>
            ))}
          </select>
          {error?.message?.groupe_id && (
            <span className="text-sm text-red-600 dark:text-red-400 mt-1 block">
              {error.message.groupe_id[0]}
            </span>
          )}
        </div>
        
        <button
          type="submit"
          className={cn(
            "w-full py-3 px-4 font-bold rounded-lg transition-colors",
            isPending
              ? "bg-blue-400 dark:bg-blue-500 text-white cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white focus:ring-4 focus:ring-blue-300 focus:outline-none"
          )}
          disabled={isPending}
        >
          {isPending ? "Création en cours..." : "Créer le stagiaire"}
        </button>
      </form>
    </div>
  );
};

