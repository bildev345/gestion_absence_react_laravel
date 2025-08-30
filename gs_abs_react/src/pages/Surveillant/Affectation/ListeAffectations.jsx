import { X, Search } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchAffectations } from "../../../api/Affectation";
import { Pagination } from "../../../components/Pagination";

export const ListeAffectations = () => {
  const { state } = useLocation();
  const [isToastOpen, setIsToastOpen] = useState(state ? true : false);
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    search: "",
  });
  const [filters, setFilters] = useState({
    active: "",
    formateur: "",
  });

  const {
    data: responseData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["affectations", pagination],
    queryFn: () => fetchAffectations(pagination, filters),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });
  console.log(responseData);

  const hideToast = () => {
    setIsToastOpen(false);
  };

  const handleReAffectation = () => {
    //
  };

  const handleSearch = (e) => {
    setPagination((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleActivate = (id) => {};

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
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {isToastOpen && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md flex justify-between items-center shadow-md">
          <span className="font-medium">{state}</span>
          <X
            className="cursor-pointer hover:text-green-900 transition-colors"
            size={18}
            onClick={hideToast}
          />
        </div>
      )}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Liste des affectations
        </h1>
        <button
          onClick={handleReAffectation}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
        >
          Réaffecter Tous
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-ful md:w-auto">
            <select
              name=""
              id=""
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choisir Formateur</option>
              <option value="">Ahmadi</option>
              <option value="">Kamali</option>
            </select>
          </div>
          <div className="w-full md:w-auto">
            <select className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Active</option>
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
        {responseData.data.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Groupe
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Formateur
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Active?
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Dernière affectation
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-medium text-center"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {responseData?.data?.map((affectation) => (
                    <tr
                      key={affectation.id}
                      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4">
                        {affectation.groupe.intitule}
                      </td>
                      <td className="px-6 py-4">{affectation.formateur.nom}</td>
                      <td className="px-6 py-4">
                        {affectation.active ? "Oui" : "Non"}
                      </td>
                      <td className="px-6 py-4">{affectation.updated_at}</td>
                      <td className="px-6 py-4">
                        {affectation.active ? (
                          "Active"
                        ) : (
                          <button
                            className="border-1 border-gray-700 dark:border-gray-100 bg-gray-500 dark:bg-gray-200 hover:border-gray-800 hover:bg-gray-600 dark:hover:border-gray-50 dark:hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
                            onClick={() => handleActivate(affectation.id)}
                          >
                            Activer
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              responseData={responseData}
              setPagination={setPagination}
            />
          </>
        ) : (
          <h1 className="text-xl font-bold text-gray-800 dark:text-white text-center py-6">Pas de données à afficher</h1>
        )}
      </div>
    </div>
  );
};
