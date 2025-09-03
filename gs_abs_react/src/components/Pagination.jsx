import { cn } from "../lib/utilis";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ responseData, setPagination, isSmall }) => {
  return (
    <>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
        {
          !isSmall && <div className="text-sm text-gray-600 dark:text-gray-400">
          Affichage de{" "}
          {(responseData.current_page - 1) * responseData.per_page + 1} à{" "}
          {responseData.to} sur {responseData.total} éléments
        </div>
        }
        <div className="flex items-center gap-2">
          <button
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600",
              isSmall ? "text-xs" : "",
              responseData.current_page === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            )}
            onClick={() =>
              setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
            }
            disabled={responseData.current_page === 1}
          >
            <ChevronLeft size={16} />
            Précédent
          </button>

          <span className={cn(
            "px-3 py-2 text-sm font-medium",
            isSmall ? "text-xs" : ""
            )}>
            Page {responseData.current_page} sur {responseData.last_page}
          </span>

          <button
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600",
              isSmall ? "text-xs" : "",
              responseData.current_page === responseData.last_page
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            )}
            onClick={() =>
              setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            disabled={responseData.current_page === responseData.last_page}
          >
            Suivant
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
};
