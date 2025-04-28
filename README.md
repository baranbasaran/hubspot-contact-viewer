# HubSpot Contact Viewer

A modern, full-stack application for viewing and managing HubSpot CRM contacts. Built with React, TypeScript, and Express, featuring a clean and intuitive user interface.

![HubSpot Contact Viewer](https://via.placeholder.com/800x400?text=HubSpot+Contact+Viewer+Screenshot)

## ✨ Features

- 🔍 View and search contacts from HubSpot CRM
- 📝 Edit contact details in real-time
- 🏢 View and manage company associations
- 📱 Responsive design for all devices
- ⚡ Fast and efficient data loading with TanStack Query
- 🔒 Secure API integration with centralized error handling

## 🛠️ Tech Stack

### Frontend

- React 18 with Vite.js
- TypeScript for type safety
- TanStack Query for data fetching
- Tailwind CSS for styling
- Axios for API requests

### Backend

- Node.js with Express
- TypeScript
- HubSpot CRM API integration
- Centralized error handling

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- HubSpot account with API access

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/baranbasaran/hubspot-contact-viewer.git
   cd hubspot-contact-viewer
   ```

2. Install dependencies:

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Configure environment variables:

   - Create `.env` in the server directory:
     ```
     HUBSPOT_API_KEY=your_hubspot_private_app_token
     PORT=3001
     ```
   - Create `.env` in the client directory:
     ```
     VITE_API_BASE_URL=http://localhost:3001
     ```

4. Start the development servers:

   ```bash
   # Start the backend server (from server directory)
   npm run dev

   # Start the frontend server (from client directory)
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
hubspot-contact-viewer/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API client and services
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript type definitions
│   │   └── pages/         # Page components
│   └── ...
└── server/                 # Backend Express application
    ├── src/
    │   ├── services/      # HubSpot service and base service
    │   ├── types/         # TypeScript type definitions
    │   └── config/        # Configuration files
    └── ...
```

## 🔧 API Documentation

### Contacts API

- `GET /api/contacts` - Get paginated contacts
- `GET /api/contacts/:id` - Get contact by ID
- `POST /api/contacts` - Create new contact
- `PATCH /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

### Companies API

- `GET /api/companies` - Get paginated companies
- `GET /api/companies/:id` - Get company by ID
- `POST /api/companies` - Create new company
- `POST /api/contacts/:contactId/companies/:companyId` - Associate contact with company
- `GET /api/contacts/:contactId/companies` - Get associated companies
