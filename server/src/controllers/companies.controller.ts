import { Request, Response } from "express";
import { HubSpotService } from "../services/hubspot.service";
import {
  ApiResponse,
  ErrorResponse,
  PaginatedResponse,
} from "../types/common.types";

export class CompaniesController {
  private hubspotService: HubSpotService;

  constructor(hubspotService: HubSpotService) {
    this.hubspotService = hubspotService;
  }

  getCompanies = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const companiesData = await this.hubspotService.getCompanies({
        page,
        limit,
      });

      const response: ApiResponse<PaginatedResponse<any>> = {
        success: true,
        data: companiesData,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const errorResponse: ErrorResponse = {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      };
      res.status(500).json(errorResponse);
    }
  };

  getCompanyById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const company = await this.hubspotService.getCompanyById(id);

      const response: ApiResponse<any> = {
        success: true,
        data: company,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const errorResponse: ErrorResponse = {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      };
      res.status(500).json(errorResponse);
    }
  };

  createCompany = async (req: Request, res: Response) => {
    try {
      const properties = req.body.properties;

      if (!properties || typeof properties !== "object") {
        const errorResponse: ErrorResponse = {
          success: false,
          error: "Invalid company properties",
          timestamp: new Date().toISOString(),
        };
        return res.status(400).json(errorResponse);
      }

      const company = await this.hubspotService.createCompany(properties);

      const response: ApiResponse<any> = {
        success: true,
        data: company,
        timestamp: new Date().toISOString(),
      };

      res.status(201).json(response);
    } catch (error) {
      const errorResponse: ErrorResponse = {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      };
      res.status(500).json(errorResponse);
    }
  };

  updateCompany = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const properties = req.body.properties;

      if (!properties || typeof properties !== "object") {
        const errorResponse: ErrorResponse = {
          success: false,
          error: "Invalid company properties",
          timestamp: new Date().toISOString(),
        };
        return res.status(400).json(errorResponse);
      }

      await this.hubspotService.updateCompany(id, properties);

      const response: ApiResponse<null> = {
        success: true,
        data: null,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const errorResponse: ErrorResponse = {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      };
      res.status(500).json(errorResponse);
    }
  };

  deleteCompany = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.hubspotService.deleteCompany(id);

      const response: ApiResponse<null> = {
        success: true,
        data: null,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const errorResponse: ErrorResponse = {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      };
      res.status(500).json(errorResponse);
    }
  };
}
