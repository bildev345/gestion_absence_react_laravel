import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import {X} from 'lucide-react';
import { useState } from "react";
import { StagiairesTable } from "../../../components/StagiairesTable";

export const ListeStagiaires = () => {
  const {state} = useLocation();
  const [isToastOpen, setIsToastOpen] = useState(state ? true : false);


  const hideToast = () => {
    setIsToastOpen(false);
  }

  return (
    <>
      {isToastOpen && (
        <div className="bg-green-200 rounded-lg text-green-400 outline-1 p-3 mb-5 font-bold flex justify-between items-center">
          <span>{state}</span>
          <X
            className="cursor-pointer hover:text-green-800"
            onClick={hideToast}
          />
        </div>
      )}
      <div className="mb-3">
        <Link
          to="ajouter"
          className="bg-gray-800 dark:bg-gray-100 rounded-lg text-gray-50 dark:text-gray-800 px-3 py-1 font-bold cursor-pointer"
        >
          Ajouter
        </Link>
      </div>
      <StagiairesTable />
    </>
  );
};
