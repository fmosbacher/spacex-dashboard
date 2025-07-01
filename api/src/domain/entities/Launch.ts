export interface Core {
  id: string;
  name: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
}

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
