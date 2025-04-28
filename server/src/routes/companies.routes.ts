import { Router } from "express";
import { CompaniesController } from "../controllers/companies.controller";
import { HubSpotService } from "../services/hubspot.service";

const router = Router();
const hubspotService = new HubSpotService();
const companiesController = new CompaniesController(hubspotService);

// Get all companies with pagination
router.get("/", companiesController.getCompanies);

// Create a new company
router.post("/", companiesController.createCompany);

// Get company by ID
router.get("/:id", companiesController.getCompanyById);

// Update company
router.patch("/:id", companiesController.updateCompany);

// Delete company
router.delete("/:id", companiesController.deleteCompany);

export default router;
