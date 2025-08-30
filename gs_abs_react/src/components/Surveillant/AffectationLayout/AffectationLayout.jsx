import { NavLink, Outlet } from "react-router-dom";
import { cn } from "../../../lib/utilis";

export const AffectationLayout = () => {
  return (
    <div>
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
            Liste Affectation
          </NavLink>
          <NavLink
            to="affecter"
            className={({ isActive }) =>
              cn(
                "hover:font-bold hover:dark:text-gray-50",
                isActive ? "font-bold text-gray-800 dark:text-gray-50" : null
              )
            }
          >
            Affecter
          </NavLink>
        </nav>
      <div className="bg-white dark:bg-gray-800 p-2 rounded-lg mt-3">
        <Outlet />
      </div>
    </div>
  );
};
