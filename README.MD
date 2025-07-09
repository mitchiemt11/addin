# Outlook Add-In Contact Enrichment System

A web-based contact enrichment system that integrates with Outlook to provide detailed contact information for email recipients.

## Overview

This solution consists of two main components:
1. Frontend UI (React + TypeScript)
2. Backend API (Node.js + Express)

The system allows users to:
- Authenticate using email and password
- View enriched contact details for email recipients
- Access contact information such as name, job title, department, and phone number

## Docker Environment Setup

### Prerequisites

1. Install Docker Desktop:
   - Visit [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Download and install the latest version for your operating system
   - Follow the installation wizard instructions

2. Install Docker Compose:
   - Docker Desktop includes Docker Compose by default
   - Verify installation by running:
     ```bash
     docker compose version
     ```

### Building and Running Containers

1. Clone the repository:
   ```bash
   git clone https://github.com/mitchiemt11/addin.git
   cd addin
   ```

2. Build and start the containers:
   ```bash
   docker compose up --build
   ```

3. Access the application:
   - Backend API: http://localhost:4000
   - Frontend: 
      - cd into addin-ui
      - Run npm install
      - Run npm run dev in that folder. 
      - Access the  site on http://localhost:5173
 

## Authentication Flow

1. User enters email and password on the login page
2. Credentials are sent to `/api/auth/login` endpoint
3. Backend validates credentials and returns a JWT token
4. Token is stored in localStorage and used for subsequent API calls
5. Protected routes require valid token for access
6. Logout clears the token and redirects to login page

## Technology Stack

### Frontend
- React 19
- TypeScript
- Vite
- TailwindCSS
- Axios for API calls
- React Router for navigation

### Backend
- Node.js
- Express.js
- JWT for authentication
- SQLite database
- CORS middleware
- Logging middleware

## Testing the Application

### Simulating Outlook Context

The application simulates Outlook context by using a sample email address. To test:

1. Visit http://localhost:5173
2. Log in with test credentials:
   - Email: test@example.com
   - Password: password123
3. After login, the system will automatically fetch contact details for the sample email

### API Testing

You can test the API endpoints using curl or Postman:

1. Login endpoint:
```bash
curl -X POST http://localhost:4000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com", "password": "password123"}'
```

2. Contact enrichment endpoint (requires valid token):
```bash
curl -X GET http://localhost:4000/api/contacts/enrich/test@example.com \
-H "Authorization: Bearer <your-token>"
```

## Research Resources

1. React Documentation: https://react.dev/
2. TypeScript Documentation: https://www.typescriptlang.org/docs/
3. Express.js Documentation: https://expressjs.com/
4. JWT Authentication: https://jwt.io/
5. Docker Documentation: https://docs.docker.com/
6. Docker Compose Documentation: https://docs.docker.com/compose/
7. TailwindCSS Documentation: https://tailwindcss.com/docs
8. React Router Documentation: https://reactrouter.com/

## Development Guidelines

1. Frontend:
   - Uses TypeScript for type safety
   - Follows React best practices
   - Maintains consistent styling with TailwindCSS
   - Uses React Router for navigation

2. Backend:
   - Follows REST API design principles
   - Implements proper error handling
   - Uses middleware for common tasks
   - Maintains clean database schema

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Future Enhancements
- _These are a few things I would like to enhance in the app, given that it may be ongoing_:

### Testing
- Add unit tests for React components using Jest and React Testing Library
- Implement API endpoint tests using Supertest
- Add end-to-end tests with Cypress
- Implement test coverage reporting

### Features
- Add contact search functionality
- Implement contact list pagination
- Add contact export to CSV/Excel
- Add contact import from CSV
- Implement contact profile image support
- Add contact notes and history
- Implement contact categorization
- Add contact relationship mapping

### UI/UX Improvements
- Add loading states and animations
- Implement dark mode support
- Add form validation feedback
- Improve error handling and user notifications
- Add keyboard navigation support
- Implement responsive design for mobile devices
- Add accessibility improvements

### Security
- Add rate limiting for API endpoints
- Implement password complexity requirements
- Add two-factor authentication
- Add session timeout
- Implement request logging and monitoring

### Performance
- Add caching for frequently accessed data
- Implement lazy loading for components
- Add API response compression
- Implement database indexing optimization
