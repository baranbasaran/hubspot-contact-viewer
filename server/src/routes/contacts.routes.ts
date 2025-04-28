import { Router } from "express";
import { ContactsController } from "../controllers/contacts.controller";
import { HubSpotService } from "../services/hubspot.service";

const router = Router();
const hubspotService = new HubSpotService();
const contactsController = new ContactsController(hubspotService);

// Get all contacts with pagination
router.get("/", contactsController.getContacts);

// Create a new contact
router.post("/", contactsController.createContact);

// Get contact by ID
router.get("/:id", contactsController.getContactById);

// Update contact
router.patch("/:id", contactsController.updateContact);

// Delete contact
router.delete("/:id", contactsController.deleteContact);

export default router;
