import type { LaunchStatus } from "../api/types";

interface LaunchesFilterProps {
  currentStatus: LaunchStatus;
  onStatusChange: (status: LaunchStatus) => void;
  onNameFilterChange: (name: string) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  currentNameFilter: string;
}

const statusOptions: { value: LaunchStatus; label: string }[] = [
  { value: "past", label: "Past" },
  { value: "latest", label: "Latest" },
  { value: "next", label: "Next" },
  { value: "upcoming", label: "Upcoming" },
];

const itemsPerPageOptions = [10, 20, 50];

export default function LaunchesFilter({
  currentStatus,
  onStatusChange,
  onNameFilterChange,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  totalPages,
  onPageChange,
  currentNameFilter,
}: LaunchesFilterProps) {
  const showPagination = currentStatus !== "latest" && currentStatus !== "next";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gray-900 p-6 rounded-sm shadow-lg space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Status Buttons */}
            <div className="flex flex-col space-y-2">
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onStatusChange(option.value)}
                    className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors
                    ${
                      currentStatus === option.value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Filter */}
            <div className="flex flex-col space-y-2">
              <input
                id="name-filter"
                type="text"
                placeholder="Filter mission name"
                value={currentNameFilter}
                onChange={(e) => onNameFilterChange(e.target.value)}
                className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Pagination Controls and Items Per Page - Only show for paginated views */}
          {showPagination && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-800">
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                {totalPages > 1 && (
                  <>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-800 text-gray-300 hover:bg-gray-700"
                      >
                        Previous
                      </button>
                      <span className="text-gray-400 whitespace-nowrap">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-medium rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-800 text-gray-300 hover:bg-gray-700"
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <label
                  htmlFor="items-per-page"
                  className="text-gray-400 text-sm font-medium whitespace-nowrap"
                >
                  Per Page:
                </label>
                <select
                  id="items-per-page"
                  value={itemsPerPage}
                  onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                  className="px-3 py-1.5 text-sm bg-gray-800 text-white border border-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[80px]"
                >
                  {itemsPerPageOptions.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
