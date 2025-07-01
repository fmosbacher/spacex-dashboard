import { LaunchRepository } from "../repositories/LaunchRepository";
import { Launch } from "../entities/Launch";

export class GetLaunches {
  constructor(private readonly launchRepository: LaunchRepository) {}

  async execute(status: string): Promise<Launch | Launch[]> {
    if (status === "latest" || status === "next") {
      return this.launchRepository.getLaunch(status);
    }
    return this.launchRepository.getLaunches(status);
  }
}
