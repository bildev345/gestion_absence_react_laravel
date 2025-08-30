import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteStagiaire, fetchStagiaires } from "../../api/Stagiaires";
import { cn } from '../../lib/utilis';
import { X, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from "react-router-dom";
import { Pagination } from "../Pagination";

export const StagiairesTable = () => {
  const queryClient = useQueryClient();
  const [deletedTarget, setDeletedTarget] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    search: "",
  });
  const [filters, setFilters] = useState({
    autorise: "",
    groupe: "",
  });

  // gérer le filtrage et la pagination de la liste des stagiaires
  const {
    data: responseData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stagiaires", pagination],
    queryFn: () => fetchStagiaires(pagination, filters),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus : false,
    staleTime : 10000
  });
  console.log(responseData);

  // gérer la suppression
  const {
    data : responseMsg,
    mutate,
    isPending,
    reset
  } = useMutation({
    mutationFn : deleteStagiaire,
    onMutate : async (stagiaireId) => {
      // cancel any outgoing refetches
      await queryClient.cancelQueries({queryKey : ['stagiaires', pagination]});
      
      // we create prevData so we can access through the context below
      const prevStagiaires = queryClient.getQueryData(['stagiaires', pagination]);
      
      // manually delete the stagiaire
      queryClient.setQueryData(['stagiaires', pagination], (old) => {
        //console.log("stagiaires data: ", old);
        return {
          ...old,
          data : old?.data.filter(stagiaire => stagiaire.id !== stagiaireId),
          total : old.total - 1
        }
      });
      return {prevStagiaires};
    },
    onError : (error, variables, context) => {
      queryClient.setQueryData(['stagiaires', pagination], context.prevStagiaires);
    },
    onSettled : () => {
      queryClient.invalidateQueries({queryKey : ['stagiaires', pagination]})
    }
  })

   
  const handleSearch = (e) => {
    setPagination((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  }

  const handleDelete = (id) => {
    setDeletedTarget(id);
    if(window.confirm("Etes-vous sur de vouloir supprimer ce stagiaire?")){
      mutate(id);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
        <p>Erreur lors du chargement des données</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      {responseMsg && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md flex justify-between items-center shadow-md">
                <span className="font-medium">{responseMsg}</span>
                <X
                  className="cursor-pointer hover:text-green-900 transition-colors"
                  size={18}
                  onClick={reset}
                />
              </div>
            )
      }
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="w-full md:w-auto">
          <select className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Filtrer par groupe</option>
            <option value="US">Groupe 1</option>
            <option value="CA">Groupe 2</option>
            <option value="FR">Groupe 3</option>
          </select>
        </div>
        <div className="w-full md:w-auto">
          <select className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Autorisé</option>
            <option value="US">Tous</option>
            <option value="CA">Oui</option>
            <option value="FR">Non</option>
          </select>
        </div>

        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Rechercher..."
            value={pagination.search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                CEF
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Nom
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Prénom
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Groupe
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Autorisé?
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {responseData?.data?.map((stagiaire) => (
              <tr
                key={stagiaire.id}
                className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 font-mono">{stagiaire.CEF}</td>
                <td className="px-6 py-4">{stagiaire.nom}</td>
                <td className="px-6 py-4">{stagiaire.prenom}</td>
                <td className="px-6 py-4">{stagiaire.groupe.intitule}</td>
                <td className="px-6 py-4">{stagiaire.autorise ? "Oui" : "Non"}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center space-x-2">
                    <Link
                      to={`/stagiaires/${stagiaire.id}`}
                      className="p-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                      title="Voir détails"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link
                      to={`/stagiaires/${stagiaire.id}/modifier`}
                      className="p-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                      title="Modifier"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(stagiaire.id)}
                      className="p-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                      title="Supprimer"
                      disabled={isPending}
                    >
                      {(isPending && deletedTarget === stagiaire.id) ? (
                        <div className="w-4 h-4 border-t-2 border-red-600 border-solid rounded-full animate-spin"></div>

                      ) : <Trash2 size={16} />
                      }  
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination responseData={responseData} setPagination={setPagination}/>
    </div>
  );
};