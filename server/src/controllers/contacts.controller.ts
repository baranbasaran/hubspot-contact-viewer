import { Request, Response } from "express";
import { HubSpotService } from "../services/hubspot.service";
import { Contact, ContactProperties } from "../types/contact.types";
import { ResponseHandler } from "../utils/responseHandler";

export class ContactsController {
  private hubspotService: HubSpotService;

  constructor(hubspotService: HubSpotService) {
    this.hubspotService = hubspotService;
  }

  getContacts = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const contactsData = await this.hubspotService.getContacts();
      ResponseHandler.success(res, contactsData);
    } catch (error) {
      console.error("Error in getContacts:", error);
      ResponseHandler.error(res, error);
    }
  };

  createContact = async (req: Request, res: Response) => {
    try {
      const properties: ContactProperties = req.body.properties;

      if (!properties || typeof properties !== "object") {
        return ResponseHandler.validationError(
          res,
          "Invalid contact properties"
        );
      }

      const contact = await this.hubspotService.createContact(properties);
      ResponseHandler.success(res, contact, 201);
    } catch (error) {
      console.error("Error in createContact:", error);
      ResponseHandler.error(res, error);
    }
  };

  getContactById = async (req: Request, res: Response) => {
    try {
      const contact = await this.hubspotService.getContactById(req.params.id);
      ResponseHandler.success(res, contact);
    } catch (error) {
      console.error("Error in getContactById:", error);
      ResponseHandler.error(res, error);
    }
  };

  updateContact = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const properties: ContactProperties = req.body.properties;

      if (!properties || typeof properties !== "object") {
        return ResponseHandler.validationError(
          res,
          "Invalid contact properties"
        );
      }

      await this.hubspotService.updateContact(id, properties);
      ResponseHandler.success(res, null);
    } catch (error) {
      console.error("Error in updateContact:", error);
      ResponseHandler.error(res, error);
    }
  };

  deleteContact = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.hubspotService.deleteContact(id);
      ResponseHandler.success(res, null);
    } catch (error) {
      console.error("Error in deleteContact:", error);
      ResponseHandler.error(res, error);
    }
  };
}
