import { Request, Response } from 'express';
import { HubSpotService } from '../services/hubspot.service';
import { ApiResponse, Contact, ErrorResponse } from '../types/contact.types';

export class ContactsController {
  private hubspotService: HubSpotService;

  constructor(hubspotService: HubSpotService) {
    this.hubspotService = hubspotService;
  }

  async getContacts(req: Request, res: Response): Promise<void> {
    try {
      const contacts = await this.hubspotService.getContacts();
      const response: ApiResponse<Contact[]> = {
        success: true,
        data: contacts,
        timestamp: new Date().toISOString(),
      };
      res.json(response);
    } catch (error) {
      const response: ErrorResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch contacts',
        timestamp: new Date().toISOString(),
      };
      res.status(500).json(response);
    }
  }

  async createContact(req: Request, res: Response): Promise<void> {
    try {
      const { properties } = req.body;
      if (!properties || typeof properties !== 'object') {
        const response: ErrorResponse = {
          success: false,
          error: 'Invalid request: properties object is required',
          timestamp: new Date().toISOString(),
        };
        res.status(400).json(response);
        return;
      }

      const contact = await this.hubspotService.createContact(properties);
      const response: ApiResponse<Contact> = {
        success: true,
        data: contact,
        timestamp: new Date().toISOString(),
      };
      res.status(201).json(response);
    } catch (error) {
      const response: ErrorResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create contact',
        timestamp: new Date().toISOString(),
      };
      res.status(500).json(response);
    }
  }

  async getContactById(req: Request, res: Response): Promise<void> {
    try {
      const contact = await this.hubspotService.getContactById(req.params.id);
      const response: ApiResponse<Contact> = {
        success: true,
        data: contact,
        timestamp: new Date().toISOString(),
      };
      res.json(response);
    } catch (error) {
      const response: ErrorResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch contact',
        timestamp: new Date().toISOString(),
      };
      res.status(500).json(response);
    }
  }

  async deleteContact(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id) {
        const response: ErrorResponse = {
          success: false,
          error: 'Contact ID is required',
          timestamp: new Date().toISOString(),
        };
        res.status(400).json(response);
        return;
      }

      await this.hubspotService.deleteContact(id);
      
      const response: ApiResponse<null> = {
        success: true,
        data: null,
        timestamp: new Date().toISOString(),
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: ErrorResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete contact',
        timestamp: new Date().toISOString(),
      };
      res.status(500).json(response);
    }
  }
} 