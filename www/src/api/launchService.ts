import type { ApiResponse, Launch } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchLaunches = async (
  status: string,
  page = 1,
  limit = 10
): Promise<ApiResponse<Launch[] | Launch>> => {
  const response = await fetch(
    `${API_URL}/api/launches?status=${status}&page=${page}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};
