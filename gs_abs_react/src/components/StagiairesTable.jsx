import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react"
import { fetchStagiaires } from "../api/Stagiaires";

export const StagiairesTable = () => {
    const [pagination, setPagination] = useState({
        page : 1,
        perPage : 25,
        search : '',
    });
    const [filters, setFilters] = useState({
        autorise : '',
        groupe  : ''
    });

    const {data : responseData, isLoading, isError} = useQuery({
        queryKey : ['stagiaires', pagination],
        queryFn : () => fetchStagiaires(pagination, filters),
        placeholderData : keepPreviousData
    });
    console.log(responseData);

    const handleSearch = (e) => {
        setPagination(prev => ({...prev, search : e.target.value, page : 1}));
    }

    const handleSort = (column) => {
        setPagination(prev => ({
            ...prev, 
            sortBy : column,
            sortDir : prev.sortBy === column ? (prev.sortDir === 'asc' ? 'desc' : 'asc') : 'asc'
        }));
    }

    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error while loading data</div>
    }
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-column sm:flex-row space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              value={pagination.search}
              onChange={handleSearch}
              required
            />
          </div>
        </div>

        <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Nom</th>
              <th className="py-3 px-6 ">Prènom</th>
              <th className="py-3 px-6">CEF</th>
            </tr>
          </thead>
          <tbody>
            {responseData?.data?.map((stagiaire) => (
              <tr key={stagiaire.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{stagiaire.nom}</td>
                <td className="px-6 py-4">{stagiaire.prenom}</td>
                <td className="px-6 py-4">{stagiaire.CEF}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="p-2 mt-4 flex justify-between items-center text-gray-700 dark:text-gray-400">
          <div>
            Showing{" "}
            {(responseData.current_page - 1) * responseData.per_page + 1} to{" "}
            {responseData.to} of {responseData.total} records
          </div>
          <div className="flex space-x-2">
            <button
              className="px-4 border rounded-lg disabled:opacity-50 hover:text-gray-800"
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              disabled={responseData.current_page === 1}
            >
              Prev
            </button>
            <span className="px-3 py-1">
              Page {responseData.current_page} of {responseData.last_page}
            </span>
            <button
              className="px-4 border rounded-lg hover:text-gray-800 disabled:opacity-50"
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={responseData.current_page === responseData.last_page}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );

}