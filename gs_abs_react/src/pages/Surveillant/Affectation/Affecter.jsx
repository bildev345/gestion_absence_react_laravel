import { useEffect, useState } from "react";
import { Search, SquareMinus, SquarePlus } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPaginatedGroupes } from "../../../api/Groupe";
import { Pagination } from "../../../components/Pagination";
import { fetchFormateurs } from "../../../api/Formateur";

export const Affecter = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    search: "",
  });
  const [formateurId, setFormateurId] = useState(null);
  const [affectations, setAffectations] = useState([]);
  const [affError, setAffError] = useState("");
  console.log("Affectation Erreur", affError);

  const { data: groupes, error } = useQuery({
    queryKey: ["groupes", pagination],
    queryFn: () => fetchPaginatedGroupes(pagination),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount : false,
    staleTime : 10000,
    gcTime : 50000
  });

  const { data: formateurs } = useQuery({
    queryKey: ["formateurs"],
    queryFn: fetchFormateurs,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  /*useEffect(() => {
    if (formateurId) {
      setAffectations((prev) => ({}));
    }
  }, [formateurId]);
  */

  const handleSearch = (e) => {
    setPagination((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };

  const getFormateurName = (id) => {
    //console.log("Type de formateur id: ", typeof(id));
    const formateur = formateurs.find((formateur) => formateur.id === parseInt(id));
    return `${formateur.nom} ${formateur.prenom}`;
  };

  const getGroupeIntitule = (id) => {
    return groupes.data.find((groupe) => groupe.id === id).intitule;
  };

  const handleAffectation = (id) => {
    //
  };

  const findAffectation = (groupe_id, formateur_id) => {
    return (
      affectations.findIndex(
        (aff) => aff.groupe_id === groupe_id && aff.formateur_id === parseInt(formateur_id)
      ) !== -1
    );
  };
  console.log(affectations);

  const affecterGroupe = (id) => {
    if (!formateurId) {
      setAffError("Veuillez choisir un formateur");
    } else {
      if (findAffectation(id, formateurId)) {
        setAffError("Vous avez déja affecté ce groupe à cet formateur!!!");
      } else {
        setAffectations((prev) => {
          const lastId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
          return [
            ...prev,
            {
              id: lastId,
              groupe_id: id,
              formateur_id: parseInt(formateurId),
            },
          ];
        });
      }
    }
  };

  const removeAffectation = (id) => {
    setAffectations(affectations.filter(aff => aff.id !== id));
  }

  if (error) {
    return <h1>Error : {error.message}</h1>;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2.5">
      <div className="w-full sm:w-1/2 p-2 border-1 border-red-900 rounded-lg">
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
            <Pagination responseData={groupes} setPagination={setPagination} />
          </div>
        ) : (
          <h1 className="text-xl font-bold text-gray-800 dark:text-white text-center py-6">
            Pas de groupes à afficher
          </h1>
        )}
      </div>
      <div className="w-full sm:w-1/2 p-2 border-1 border-red-900 rounded-lg">
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
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm text-center text-gray-700 dark:text-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Groupe
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Formateur
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {affectations?.map((affectation) => (
                <tr
                  key={affectation.id}
                  className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    {getGroupeIntitule(affectation.groupe_id)}
                  </td>
                  <td className="px-6 py-4">
                    {getFormateurName(affectation.formateur_id)}
                  </td>
                  <td className="px-6 py-4 flex justify-center">
                    <SquareMinus
                      className="cursor-pointer"
                      onClick={() => removeAffectation(affectation.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
