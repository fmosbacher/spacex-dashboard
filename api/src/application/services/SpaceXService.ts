import axios from "axios";
import { Launch } from "../../domain/entities/Launch";

export class SpaceXService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.SPACEX_URL || "https://api.spacexdata.com/v5";
  }

  private normalizeSpaceXLaunchData(apiData: any): Launch {
    return {
      id: apiData.id || `launch-${Date.now()}`,
      name: apiData.name || "Unnamed Mission",
      flightNumber: apiData.flight_number || 0,
      rocket: apiData.rocket || "Unknown",
      status: apiData.upcoming
        ? "upcoming"
        : apiData.success === true
          ? "success"
          : apiData.success === false
            ? "failed"
            : "unknown",
      dateUTC: apiData.date_utc || new Date().toISOString(),
      launchSite: apiData.launchpad?.name || "Unknown",
      payload: apiData.payloads?.[0]?.name || "Classified",
      cores: (apiData.cores || []).map((core: any) => ({
        id: core.core || `unknown-core-${Date.now()}`,
        name: core.core || `unknown-core-${Date.now()}`,
        flight: typeof core.flight === "number" ? core.flight : 0,
        gridfins: typeof core.gridfins === "boolean" ? core.gridfins : false,
        legs: typeof core.legs === "boolean" ? core.legs : false,
        reused: typeof core.reused === "boolean" ? core.reused : false,
      })),
      webcastId: apiData.links?.youtube_id || undefined,
    };
  }

  async fetchLaunches(status: string): Promise<Launch[]> {
    const url = `${this.baseUrl}/launches/${status}`;
    const response = await axios.get(url);
    const data = response.data;
    return Array.isArray(data) ? data.map(this.normalizeSpaceXLaunchData) : [];
  }

  async fetchLaunch(status: "latest" | "next"): Promise<Launch> {
    const url = `${this.baseUrl}/launches/${status}`;
    const response = await axios.get(url);
    return this.normalizeSpaceXLaunchData(response.data);
  }
}
