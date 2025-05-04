# Creator Dashboard Backend

A Node.js backend application for a creator dashboard platform that allows users to save posts, report content, and earn rewards through various interactions.

## Features

- User authentication (login/register)
- Admin authentication and management
- Post saving functionality
- Content reporting system
- Reward system (daily login, post sharing)
- User coin management

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Redis** - Caching (optional)
- **bcrypt** - Password hashing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance
- Redis instance (optional)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd creator-dashboard-backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/creator-dashboard
JWT_SECRET=your_jwt_secret_key
ADMIN_KEY=your_admin_secret_key
REDIS_HOST=localhost
REDIS_PORT=6379

TWITTER_BEARER_TOKEN=your_twitter_bearer_token
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USERNAME=your_reddit_username
REDDIT_PASSWORD=your_reddit_password
USER_AGENT=your_user_agent
```

4. Start the server
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login a user
- `POST /auth/registerAdmin` - Register a new admin (requires admin key)
- `POST /auth/loginAdmin` - Login an admin

### User Routes
- `POST /users/savePost` - Save a post
- `POST /users/reportPost` - Report a post
- `POST /users/dailyLoginReward` - Claim daily login reward
- `POST /users/sharePostReward` - Claim post sharing reward
- `POST /users/savePostReward` - Claim save post reward
- `POST /users/completeProfileReward` - Claim profile completion reward
- `GET /users/profile` - Get user profile
- `GET /users/savedPosts` - Get user's saved posts

### Admin Routes
- `GET /admin/reports` - Get all reported posts
- `PUT /admin/updateCoins` - Update user coins
- `GET /admin/users` - Get all users

### Posts Routes
- `GET /posts` - Get combined feed of posts from Reddit and Twitter

## Project Structure

```
creator-dashboard-backend/
├── config/
│   ├── db.js
│   └── redis.js
├── controllers/
│   ├── admin.controller.js
│   ├── auth.controller.js
│   └── user.controller.js
├── middlewares/
│   ├── auth.middleware.js
│   └── role.middleware.js
├── models/
│   ├── admin.model.js
│   ├── posts.model.js
│   ├── reports.model.js
│   └── users.model.js
├── routes/
│   ├── admin.route.js
│   ├── auth.route.js
│   └── user.route.js
├── services/
│   └── redis.service.js
├── utils/
│   ├── coinUtils.js
│   └── generateToken.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Author

Milan Dey

