import { NavLink, Outlet } from "react-router-dom";
import { cn } from "../../../lib/utilis";

export const StagiairesLayout = () => {
  return (
    <div>
      <div className="flex justify-between">
        <nav className="flex space-x-6 w-2/7 font-[600] text-gray-600 dark:text-gray-300">
          <NavLink
            to="."
            className={({ isActive }) =>
              cn(
                "hover:font-bold hover:dark:text-gray-50",
                isActive ? "font-bold text-gray-800 dark:text-gray-50" : null
              )
            }
            end
          >
            Stagiaires
          </NavLink>
          <NavLink
            to="importer"
            className={({ isActive }) =>
              cn(
                "hover:font-bold hover:dark:text-gray-50",
                isActive ? "font-bold text-gray-800 dark:text-gray-50" : null
              )
            }
          >
            Importer
          </NavLink>
        </nav>
        <a href="/src/assets/structure-example.xlsx" className="dark:bg-gray-200 dark:text-gray-800 dark:border hover:font-[600] dark:hover:font-[600] dark:border-gray-200 dark:hover:bg-gray-50 cursor-pointer border border-gray-400 hover:border-gray-600 px-4 py-1 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-800 transition-all duration-300">
          Example
        </a>
      </div>
      <div className="bg-white dark:bg-gray-800 p-2 rounded-lg mt-3">
        <Outlet />
      </div>
    </div>
  );
};
