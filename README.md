# Ideas Collector - Frontend

## Project Overview
Frontend client for the Ideas Collector application, built with React.js. This client provides a modern, responsive user interface for users to collect, organize, and manage their creative ideas.

## Technology Stack
- React.js (v19.0.0)
- React Router DOM (v7.4.0)
- Axios for API requests

## Features
- Modern, responsive user interface
- User authentication (login/register)
- Idea management (create, read, update, delete)
- Protected routes
- Form validation
- Error handling
- Loading states
- Responsive design

## Development Setup

### Prerequisites
- Node.js (>=14.0.0)
- npm or yarn package manager

### Setup Instructions
1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure
```
Frontend/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── ideas/
│   │   └── common/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── hooks/
│   ├── context/
│   ├── App.js
│   └── index.js
└── package.json
```

## Available Scripts
- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Environment Variables
Create a `.env` file in the Frontend directory with the following variables:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## Deployment
The frontend is configured for deployment on Vercel (vercel.json included).

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.
