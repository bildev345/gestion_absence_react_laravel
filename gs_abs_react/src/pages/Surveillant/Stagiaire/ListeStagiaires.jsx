import { Link, useLocation } from "react-router-dom";
import { X } from 'lucide-react';
import { useState } from "react";
import { StagiairesTable } from "../../../components/Surveillant/StagiairesTable";

export const ListeStagiaires = () => {
  const { state } = useLocation();
  const [isToastOpen, setIsToastOpen] = useState(state ? true : false);

  const hideToast = () => {
    setIsToastOpen(false);
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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Liste des Stagiaires</h1>
        <Link
          to="ajouter"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
        >
          Ajouter un stagiaire
        </Link>
      </div>
      <StagiairesTable />
    </div>
  );
};