import { Launch } from "../entities/Launch";

export interface LaunchRepository {
  getLaunches(status: string): Promise<Launch[]>;
  getLaunch(status: "latest" | "next"): Promise<Launch>;
}
