import { Request, Response } from "express";
import { GetLaunches } from "../../domain/useCases/GetLaunches";

const VALID_STATUSES = ["past", "latest", "next", "upcoming"];
type LaunchStatus = (typeof VALID_STATUSES)[number];

interface ValidatedParams {
  status: LaunchStatus;
  limit: number;
  page: number;
}

export class LaunchesController {
  constructor(private readonly getLaunchesUseCase: GetLaunches) {}

  private isValidStatus(status: string): boolean {
    return VALID_STATUSES.includes(status as LaunchStatus);
  }

  private validateAndParseLimit(limitStr: string | undefined): number {
    const defaultLimit = 10;
    if (limitStr === undefined) return defaultLimit;

    const parsed = parseInt(limitStr, 10);
    if (isNaN(parsed)) {
      throw new Error("Limit must be a number");
    }
    return Math.min(Math.max(parsed, 1), 100);
  }

  private validateAndParsePage(pageStr: string | undefined): number {
    const defaultPage = 1;
    if (pageStr === undefined) return defaultPage;

    const parsed = parseInt(pageStr, 10);
    if (isNaN(parsed)) {
      throw new Error("Page must be a number");
    }
    return Math.max(parsed, 1);
  }

  private validateQueryParams(req: Request): ValidatedParams {
    const status = req.query.status as string;
    if (!this.isValidStatus(status)) {
      throw new Error(
        'Status should be one of "past", "latest", "next" or "upcoming"',
      );
    }

    const limit = this.validateAndParseLimit(
      req.query.limit as string | undefined,
    );
    const page = this.validateAndParsePage(
      req.query.page as string | undefined,
    );

    return { status: status as LaunchStatus, limit, page };
  }

  private paginateData(data: any[], page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      pagination: {
        total: data.length,
        page,
        limit,
        totalPages: Math.ceil(data.length / limit),
        hasNextPage: endIndex < data.length,
      },
    };
  }

  async getLaunches(req: Request, res: Response): Promise<void> {
    try {
      const { status, limit, page } = this.validateQueryParams(req);
      const data = await this.getLaunchesUseCase.execute(status);

      if (Array.isArray(data)) {
        const result = this.paginateData(data, page, limit);
        res.json(result);
      } else {
        res.json({ data, pagination: null });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        error:
          error instanceof Error ? error.message : "Failed to fetch launches",
      });
    }
  }
}
