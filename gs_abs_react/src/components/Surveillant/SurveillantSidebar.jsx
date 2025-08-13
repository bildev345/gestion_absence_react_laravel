import { cn } from "../../lib/utilis";
import { NavLink } from "react-router-dom";
import {X} from 'lucide-react';
export const SurveillantSidebar = ({sidebarOpen, setSidebarOpen}) => {
  return (
      <aside
      className={`fixed md:static inset-y-0 left-0 z-20 w-64 bg-white dark:bg-gray-800 shadow-lg md:shadow-none transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          <button
            className="md:hidden text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            
              <li>
                <NavLink
                  to='.'
                  className={({isActive})=>cn(
                                "block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200",
                                "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                                `${isActive ? "bg-gray-100 dark:bg-gray-700 font-bold text-gray-800 dark:text-gray-300" : null}`
                              )}
                  end            
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='listeAbs'
                  className={({isActive})=>cn(
                                "block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200",
                                "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                                `${isActive ? "bg-gray-100 dark:bg-gray-700 font-bold text-gray-800 dark:text-gray-300" : null}`
                              )}
                >
                  Absence
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='affectation'
                  className={({isActive})=>cn(
                                "block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200",
                                "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                                `${isActive ? "bg-gray-100 dark:bg-gray-700 font-bold text-gray-800 dark:text-gray-300" : null}`
                              )}
                >
                  Affectation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='listeGr'
                  className={({isActive})=>cn(
                                "block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200",
                                "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                                `${isActive ? "bg-gray-100 dark:bg-gray-700 font-bold text-gray-800 dark:text-gray-300" : null}`
                              )}
                >
                  Groupes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='stagiaire'
                  className={({isActive})=>cn(
                                "block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200",
                                "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                                `${isActive ? "bg-gray-100 dark:bg-gray-700 font-bold text-gray-800 dark:text-gray-300" : null}`
                              )}
                >
                  Stagiaires
                </NavLink>
              </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
