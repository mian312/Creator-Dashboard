# Creator Dashboard Platform

A full-stack web application that allows content creators to manage posts, track engagement, and earn rewards through various interactions. The platform consists of a React frontend and Node.js backend.

![Creator Dashboard](https://via.placeholder.com/800x400?text=Creator+Dashboard)

## Project Overview

The Creator Dashboard is a comprehensive platform designed for content creators to:
- Browse and save content from social media platforms (Reddit, Twitter)
- Report inappropriate content
- Earn rewards through various interactions
- Track engagement and manage their profile

The platform also includes an admin interface for content moderation and user management.

## Repository Structure

This monorepo contains both frontend and backend components:

```
creator-dashboard/
├── Frontend/           # React frontend application
├── Backend/            # Node.js backend API
└── README.md           # This file
```

## Tech Stack

### Frontend
- React 19
- Redux Toolkit
- TailwindCSS
- React Router
- Axios
- Vite

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Redis (optional)
- bcrypt

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance
- Redis instance (optional)
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd creator-dashboard
```

2. Set up the backend
```bash
cd Backend
npm install
# Create .env file with required variables (see Backend/README.md)
npm start
```

3. Set up the frontend
```bash
cd ../Frontend
npm install
# Create .env file with required variables (see Frontend/README.md)
npm run dev
```

4. Access the application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Features

### User Features
- Authentication (register/login)
- Browse content feed from multiple sources
- Save posts for later viewing
- Report inappropriate content
- Earn coins through various interactions:
  - Daily login
  - Sharing posts
  - Saving posts
  - Completing profile
- View and manage profile

### Admin Features
- Separate authentication system
- View and manage reported content
- Adjust user coin balances
- View all users and their activities

## Documentation

For detailed documentation on each component:
- [Frontend Documentation](./Frontend/README.md)
- [Backend Documentation](./Backend/README.md)
- [API Testing Guide](./Backend/TEST_GUIDE.md)

## Deployment

### Backend Deployment
The backend can be deployed to any Node.js hosting service like Heroku, AWS, or DigitalOcean.

### Frontend Deployment
The frontend can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

Milan Dey