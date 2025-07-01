export interface Launch {
  id: string;
  name: string;
  flightNumber: number;
  rocket: string;
  status: "upcoming" | "success" | "failed" | "unknown";
  dateUTC: string;
  launchSite: string;
  payload: string;
  cores: Core[];
  webcastId?: string;
}

export interface Core {
  id: string;
  name: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
}

export type LaunchStatus = "latest" | "next" | "upcoming" | "past";

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface ApiResponse<T> {
  data: T;
  pagination: Pagination | null;
}
