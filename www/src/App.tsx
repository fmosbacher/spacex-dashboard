import { useMemo, useCallback } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import useLaunches from "./hooks/useLaunches";
import { Loading, ErrorMessage, LaunchesFilter } from "./components";
import { LaunchPage, LaunchesPage } from "./pages";
import type { LaunchStatus } from "./api/types";

export default function App() {
  const { status: urlStatus } = useParams<{ status: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = (
    ["past", "latest", "next", "upcoming"].includes(urlStatus || "")
      ? urlStatus
      : "latest"
  ) as LaunchStatus;

  const nameFilter = searchParams.get("name") || "";
  const itemsPerPage = parseInt(searchParams.get("limit") || "10", 10);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { launches, loading, error, pagination } = useLaunches(
    status,
    itemsPerPage,
    currentPage
  );

  const handleStatusChange = useCallback(
    (newStatus: LaunchStatus) => {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.delete("page");
      const queryString = currentParams.toString();
      navigate(`/${newStatus}${queryString ? `?${queryString}` : ""}`);
    },
    [navigate]
  );

  const handleNameFilterChange = useCallback(
    (name: string) => {
      setSearchParams((prev) => {
        if (name) {
          prev.set("name", name);
        } else {
          prev.delete("name");
        }
        prev.set("page", "1");
        return prev;
      });
    },
    [setSearchParams]
  );

  const handleItemsPerPageChange = useCallback(
    (items: number) => {
      setSearchParams({ limit: items.toString(), page: "1" });
    },
    [setSearchParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setSearchParams({ page: page.toString() });
    },
    [setSearchParams]
  );

  const filteredLaunches = useMemo(() => {
    return launches.filter((launch) =>
      launch.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }, [launches, nameFilter]);

  const launchesFilter = (
    <LaunchesFilter
      currentStatus={status}
      onStatusChange={handleStatusChange}
      onNameFilterChange={handleNameFilterChange}
      itemsPerPage={itemsPerPage}
      onItemsPerPageChange={handleItemsPerPageChange}
      currentPage={currentPage}
      totalPages={pagination?.totalPages || 1}
      onPageChange={handlePageChange}
      currentNameFilter={nameFilter}
    />
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        {launchesFilter}
        <Loading />
      </div>
    );
  }

  if (error) return <ErrorMessage message={error} />;

  if (!launches || launches.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        {launchesFilter}
        <ErrorMessage message="No launch data found" />
      </div>
    );
  }

  const singleLaunch =
    (status === "latest" || status === "next") && filteredLaunches.length > 0;

  return (
    <div className="min-h-screen bg-black text-white pt-[360px] sm:pt-[280px] md:pt-[220px]">
      {launchesFilter}
      {singleLaunch ? (
        <LaunchPage launch={filteredLaunches[0]} loading={loading} />
      ) : (
        <LaunchesPage launches={filteredLaunches} loading={loading} />
      )}
    </div>
  );
}
