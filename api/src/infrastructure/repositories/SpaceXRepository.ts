import { LaunchRepository } from "../../domain/repositories/LaunchRepository";
import { Launch } from "../../domain/entities/Launch";
import { SpaceXService } from "../../application/services/SpaceXService";

export class SpaceXRepository implements LaunchRepository {
  constructor(private readonly spaceXService: SpaceXService) {}

  async getLaunches(status: string): Promise<Launch[]> {
    return this.spaceXService.fetchLaunches(status);
  }

  async getLaunch(status: "latest" | "next"): Promise<Launch> {
    return this.spaceXService.fetchLaunch(status);
  }
}
