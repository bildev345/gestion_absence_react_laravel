import { Link, NavLink } from "react-router-dom";
import { cn } from "../lib/utilis";
import ImgLogo from "../assets/logo1.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../features/authSlice";
import { Menu } from "lucide-react";

export const Header = ({setSidebarOpen}) => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useSelector(
    (state) => state.authUser
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const activeStyles = {
    color: "#1447E6",
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const openDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(clearUser());
    closeMenu();
  }
  
  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center spac-x-4">
          <button
            className="md:hidden text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link
            to="."
            className="flex items-center space-x-3 rtl:space-x-reverse"
            >
            <img src={ImgLogo} className="h-10" alt="gs-abs" />
          </Link>
        </div>
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className={cn(
            "inline-flex items-center p-2 w-10 h-10",
            "justify-center text-sm text-gray-500",
            "rounded-lg md:hidden hover:bg-gray-100",
            "focus:outline-none focus:ring-2 focus:ring-gray-200",
            "dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          )}
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={cn(
            "absolute top-full left-0 w-full md:relative md:top-auto",
            "md:left-auto bg-white dark:bg-gray-900 shadow-lg md:shadow-none",
            "z-10 md:block md:w-auto",
            isMenuOpen ? "block" : "hidden"
          )}
          id="navbar-default"
        >
          <ul
            className={cn(
              "font-bold flex flex-col p-4 md:p-0 mt-4",
              "border border-gray-100 rounded-lg bg-gray-50",
              "md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0",
              "md:border-0 md:bg-white dark:bg-gray-800",
              "md:dark:bg-gray-900 dark:border-gray-700"
            )}
          >
            <li>
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    id="dropdownDividerButton"
                    data-dropdown-toggle="dropdownDivider"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={openDropdown}
                  >
                    {user.nom}
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <div
                    id="dropdownDivider"
                    className={cn(
                      "absolute top-full md:right-0 mt-2",
                      "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm",
                      "w-44 dark:bg-gray-700 dark:divide-gray-600",
                      isDropdownOpen ? "block" : "hidden"
                    )}
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDividerButton"
                    >
                      <li>
                        <Link
                          to="."
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="settings"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </Link>
                      </li>
                    </ul>
                    <div className="py-2">
                      <Link
                        to=".."
                        onClick={logout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Logout
                      </Link>    
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  to="login"
                  className={cn(
                    "block py-2 px-3 text-gray-900 rounded-sm",
                    "hover:bg-gray-100 md:hover:bg-transparent",
                    "md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500",
                    "dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  )}
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
