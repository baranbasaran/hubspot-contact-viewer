import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { HubSpotService } from './services/hubspot.service';
import { CompanyService } from './services/company.service';
import { Contact } from './types/contact.types';
import { Company } from './types/company.types';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize HubSpot service
const hubspotApiKey = process.env.HUBSPOT_API_KEY;
if (!hubspotApiKey) {
  throw new Error('HUBSPOT_API_KEY environment variable is required');
}

const hubspotService = new HubSpotService({
  apiKey: hubspotApiKey,
  baseUrl: 'https://api.hubapi.com',
  version: '3'
});

const companyService = new CompanyService(hubspotService);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    console.log('Received request for contacts');
    const contacts = await hubspotService.getContacts();
    console.log(`Returning ${contacts.length} contacts`);
    
    res.json({
      success: true,
      data: contacts,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch contacts',
      timestamp: new Date().toISOString()
    });
  }
});

// Get contact by ID
app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await hubspotService.getContactById(req.params.id);
    res.json({
      success: true,
      data: contact,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch contact',
      timestamp: new Date().toISOString()
    });
  }
});

// Create a new contact
app.post('/api/contacts', async (req, res) => {
  try {
    const contact = await hubspotService.createContact(req.body.properties);
    res.status(201).json({
      success: true,
      data: contact,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create contact',
      timestamp: new Date().toISOString()
    });
  }
});

// Update a contact
app.patch('/api/contacts/:id', async (req, res) => {
  try {
    await hubspotService.updateContact(req.params.id, req.body.properties);
    res.json({
      success: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update contact',
      timestamp: new Date().toISOString()
    });
  }
});

// Delete a contact
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    await hubspotService.deleteContact(req.params.id);
    res.json({
      success: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete contact',
      timestamp: new Date().toISOString()
    });
  }
});

// Get all companies
app.get('/api/companies', async (req, res) => {
  try {
    const companies = await companyService.getCompanies();
    res.json({
      success: true,
      data: companies,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch companies',
      timestamp: new Date().toISOString()
    });
  }
});

// Get company by ID
app.get('/api/companies/:id', async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    res.json({
      success: true,
      data: company,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch company',
      timestamp: new Date().toISOString()
    });
  }
});

// Create a new company
app.post('/api/companies', async (req, res) => {
  try {
    const company = await companyService.createCompany(req.body.properties);
    res.status(201).json({
      success: true,
      data: company,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create company',
      timestamp: new Date().toISOString()
    });
  }
});

// Update a company
app.patch('/api/companies/:id', async (req, res) => {
  try {
    await companyService.updateCompany(req.params.id, req.body.properties);
    res.json({
      success: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update company',
      timestamp: new Date().toISOString()
    });
  }
});

// Delete a company
app.delete('/api/companies/:id', async (req, res) => {
  try {
    await companyService.deleteCompany(req.params.id);
    res.json({
      success: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete company',
      timestamp: new Date().toISOString()
    });
  }
});

// Associate a contact with a company
app.post('/api/contacts/:contactId/companies/:companyId', async (req, res) => {
  try {
    await companyService.associateContactWithCompany(req.params.contactId, req.params.companyId);
    res.json({
      success: true,
      message: 'Contact successfully associated with company',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error associating contact with company:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to associate contact with company',
      timestamp: new Date().toISOString()
    });
  }
});

// Get companies associated with a contact
app.get('/api/contacts/:contactId/companies', async (req, res) => {
  try {
    const companies = await companyService.getAssociatedCompanies(req.params.contactId);
    res.json({
      success: true,
      data: companies,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching associated companies:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch associated companies',
      timestamp: new Date().toISOString()
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('HubSpot token configured:', !!process.env.HUBSPOT_API_KEY);
}); 