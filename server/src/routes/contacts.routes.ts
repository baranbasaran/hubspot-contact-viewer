import { Router } from 'express';
import { ContactsController } from '../controllers/contacts.controller';
import { HubSpotService } from '../services/hubspot.service';
import { config } from '../config';

const router = Router();
const hubspotService = new HubSpotService(config.hubspot);
const contactsController = new ContactsController(hubspotService);

router.get('/', (req, res) => contactsController.getContacts(req, res));
router.post('/', (req, res) => contactsController.createContact(req, res));
router.get('/:id', (req, res) => contactsController.getContactById(req, res));
router.delete('/:id', (req, res) => contactsController.deleteContact(req, res));

export default router; 