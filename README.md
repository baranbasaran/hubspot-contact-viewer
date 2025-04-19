# Contact Viewer - HubSpot CRM Integration

A full-stack application that allows users to view and manage contacts from HubSpot CRM. Built with React, TypeScript, and Express.

## Features

- View contacts from HubSpot CRM
- Search and filter contacts
- View detailed contact information in a modal
- Edit contact details
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React with Vite.js, TypeScript, and TanStack Query
- **Backend**: Node.js with Express and TypeScript
- **Styling**: Tailwind CSS
- **External API**: HubSpot CRM API

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- HubSpot Private App Token

## Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd contact-viewer-hubspot-crm
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

3. Create environment files:
   - Create `.env` in the server directory with:
     ```
     HUBSPOT_API_KEY=your_hubspot_private_app_token
     ```

4. Start the development servers:
   ```bash
   # Start the backend server (from server directory)
   npm run dev

   # Start the frontend server (from client directory)
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
contact-viewer-hubspot-crm/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API client functions
│   │   ├── components/    # React components
│   │   ├── types/         # TypeScript type definitions
│   │   └── ...
│   └── ...
└── server/                 # Backend Express application
    ├── src/
    │   ├── services/      # HubSpot service
    │   ├── types/         # TypeScript type definitions
    │   └── ...
    └── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 