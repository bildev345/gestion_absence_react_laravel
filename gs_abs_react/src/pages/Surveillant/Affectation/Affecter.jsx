import { useEffect, useState } from "react";
import { Search, SquareMinus, SquarePlus } from "lucide-react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { fetchPaginatedGroupes } from "../../../api/Groupe";
import { Pagination } from "../../../components/Pagination";
import { fetchFormateurs } from "../../../api/Formateur";
import { addAffectations } from "../../../api/Affectation";
import {cn} from '../../../lib/utilis';
import {X} from 'lucide-react';

export const Affecter = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    search: "",
  });
  const [formateurId, setFormateurId] = useState(null);
  const [affectations, setAffectations] = useState([]);
  const [affError, setAffError] = useState("");

  //récuperer la liste des groupes avec pagination
  const { data: groupes, error: queryGroupesError } = useQuery({
    queryKey: ["groupes", pagination],
    queryFn: () => fetchPaginatedGroupes(pagination),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 10000,
    gcTime: 50000,
  });

  // récuperer la liste des formateurs
  const { data: formateurs } = useQuery({
    queryKey: ["formateurs"],
    queryFn: fetchFormateurs,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // enregistrer les affectations
  const {
    data: responseMsg,
    error: mutationError,
    mutate,
    isPending,
    reset,
  } = useMutation({
    mutationFn: addAffectations,
  });

  const handleSearch = (e) => {
    setPagination((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };

  const getFormateurName = (id) => {
    const formateur = formateurs.find(
      (formateur) => formateur.id === parseInt(id)
    );
    return `${formateur.nom} ${formateur.prenom}`;
  };

  const handleAffectation = () => {
    if(affectations.length === 0){
      setAffError("La liste des affectations est Vide");
      return;
    }
    const affectationsData = affectations.map((aff) => ({
      groupe_id: aff.groupe_id,
      formateur_id: aff.formateur_id,
    }));
    mutate(affectationsData);
  };

  const findAffectation = (groupe_id, formateur_id) => {
    return (
      affectations.findIndex(
        (aff) =>
          aff.groupe_id === groupe_id &&
          aff.formateur_id === parseInt(formateur_id)
      ) !== -1
    );
  };
  //console.log(affectations);

  const affecterGroupe = (id) => {
    if (!formateurId) {
      setAffError("Veuillez choisir un formateur");
    } else {
      if (findAffectation(id, formateurId)) {
        setAffError("Vous avez déja affecté ce groupe à cet formateur!!!");
      } else {
        setAffError("");
        setAffectations((prev) => {
          const lastId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
          return [
            ...prev,
            {
              id: lastId,
              groupe_id: id,
              intituleGr: groupes?.data.find((groupe) => groupe.id === id)
                .intitule,
              formateur_id: parseInt(formateurId),
            },
          ];
        });
      }
    }
  };

  const removeAffectation = (id) => {
    setAffError("");
    setAffectations(affectations.filter((aff) => aff.id !== id));
  };

  if (queryGroupesError) {
    return (
      <h1 className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-2">
        Error : {queryGroupesError.message}
      </h1>
    );
  }

  return (
    <>
      {mutationError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-2 flex justify-between items-center shadow-md">
          <span className="font-medium">{mutationError.message}</span>
          <X
            className="cursor-pointer hover:text-red-900 transition-colors"
            size={18}
            onClick={reset}
          />
        </div>
      )}
      {responseMsg && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md flex justify-between items-center shadow-md">
          <span className="font-medium">{responseMsg.success}</span>
          <X
            className="cursor-pointer hover:text-green-900 transition-colors"
            size={18}
            onClick={reset}
          />
        </div>
      )}
      {affError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-2">
          <p>{affError}</p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="w-full sm:w-2/5 p-2 rounded-lg">
          <div className="relative w-full">
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
          {groupes?.data?.length > 0 ? (
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm text-center text-gray-700 dark:text-gray-300">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Groupe
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {groupes.data.map((groupe) => (
                    <tr
                      key={groupe.id}
                      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4">{groupe.intitule}</td>
                      <td className="px-6 py-4 flex justify-center">
                        <SquarePlus
                          className="cursor-pointer"
                          onClick={() => affecterGroupe(groupe.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                responseData={groupes}
                setPagination={setPagination}
                isSmall={true}
              />
            </div>
          ) : (
            <h1 className="text-xl font-bold text-gray-800 dark:text-white text-center py-6">
              Pas de groupes à afficher
            </h1>
          )}
        </div>
        <div className="w-full sm:w-3/5 p-2 rounded-lg">
          <div>
            <select
              onChange={(e) => setFormateurId(e.target.value)}
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choisir un formateur</option>
              {formateurs?.map((formateur) => (
                <option
                  key={formateur.id}
                  value={formateur.id}
                >{`${formateur.nom} ${formateur.prenom}`}</option>
              ))}
            </select>
            <div className="overflow-x-auto mt-3 text-sm text-gray-700 dark:text-gray-300 text-center">
              <div className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300 mt-[3px]">
                <div className="grid grid-cols-3">
                  <div className="px-6 py-3 font-medium">Groupe</div>
                  <div className="px-6 py-3 font-medium">Formateur</div>
                  <div className="px-6 py-3 font-medium">Action</div>
                </div>
              </div>
              <div className="h-[300px] overflow-y-scroll">
                {affectations?.map((affectation) => (
                  <div
                    key={affectation.id}
                    className="grid grid-cols-3 bg-white dark:bg-gray-800 border-b border-gray-200"
                  >
                    <div className="px-6 py-4">{affectation.intituleGr}</div>
                    <div className="px-6 py-4">
                      {getFormateurName(affectation.formateur_id)}
                    </div>
                    <div className="px-6 py-4 flex justify-center">
                      <SquareMinus
                        className="cursor-pointer"
                        onClick={() => removeAffectation(affectation.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-white dark:bg-gray-800 pt-2 pb-2 z-10">
                <button
                  onClick={handleAffectation}
                  className={cn(
                    "w-full text-white py-3 px-4 font-bold rounded-lg transition-colors",
                    isPending 
                    ? "bg-blue-400 dark:bg-blue-500 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-300 focus:outline-none"
                  )}
                  disabled={isPending}
                >
                  Affecter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
