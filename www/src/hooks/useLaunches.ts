import { useQuery } from "@tanstack/react-query";
import { fetchLaunches } from "../api/launchService";
import type { LaunchStatus } from "../api/types";

export default function useLaunches(
  status: LaunchStatus,
  itemsPerPage: number = 10,
  page: number = 1
) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["launches", status, page, itemsPerPage],
    queryFn: () => fetchLaunches(status, page, itemsPerPage),
  });

  return {
    launches: Array.isArray(data?.data)
      ? data.data
      : data?.data
      ? [data.data]
      : [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    pagination: data?.pagination ?? null,
  };
}
