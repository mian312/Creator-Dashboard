# Creator Dashboard

A modern web application built with React and Vite that allows content creators to manage their posts, track engagement, and earn rewards through various interactions.

## Features

- **User Authentication**: Secure login and registration system
- **Content Feed**: Browse and interact with posts from various sources
- **Save Posts**: Save interesting content for later viewing
- **Reward System**: Earn coins through daily logins, sharing, and saving posts
- **Profile Management**: Update and complete your profile information
- **Admin Dashboard**: Moderation tools for administrators including user management and report handling

## Tech Stack

- **Frontend**: React 19 with Redux Toolkit for state management
- **Styling**: TailwindCSS for responsive design
- **Routing**: React Router for navigation
- **API Communication**: Axios for HTTP requests
- **Build Tool**: Vite for fast development and optimized production builds
- **Icons**: Lucide React for beautiful UI icons
- **Notifications**: React Toastify for user feedback

## Getting Started

### Prerequisites

- Node.js (version 18.0.0 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
   ```
   git clone https://github.com/mian312/creator-dashboard.git
   cd creator-dashboard
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_URL=your_api_url_here
   ```
   ```
   NOTE: Before deployment make sure to check vercel.json for API rewrites.
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code quality issues

## Project Structure

```
creator-dashboard/
├── public/             # Static assets
├── src/
│   ├── api/            # API service layer
│   ├── app/            # Redux store configuration
│   ├── components/     # Reusable UI components
│   ├── features/       # Redux slices and related logic
│   ├── pages/          # Page components
│   ├── routes/         # Routing configuration
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── .eslintrc.js        # ESLint configuration
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # TailwindCSS configuration
└── vite.config.js      # Vite configuration
```

## API Integration

The application communicates with a backend API through a proxy configuration in Vite. All API requests are sent to the `/api` endpoint, which is then proxied to the actual API server defined in the environment variables.

## Deployment

To deploy the application:

1. Build the production version
   ```
   npm run build
   ```

2. The built files will be in the `dist` directory, which can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


