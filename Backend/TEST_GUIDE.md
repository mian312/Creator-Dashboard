# API Testing Guide

This document provides test cases for all routes in the Creator Dashboard Backend.

## Authentication Routes

### 1. Register User
- **URL**: `POST http://localhost:3000/auth/register`
- **Body**:
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```    ✔✔✔

### 2. Login User
- **URL**: `POST http://localhost:3000/auth/login`
- **Body**:
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```    ✔✔✔

## Admin Routes

### 3. Register Admin
- **URL**: `POST http://localhost:3000/auth/registerAdmin`
- **Body**:
  ```json
  {
    "username": "admin",
    "password": "adminpass",
    "adminKey": "password"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Admin registered successfully"
  }
  ```

### 4. Login Admin
- **URL**: `POST http://localhost:3000/auth/loginAdmin`
- **Body**:
  ```json
  {
    "username": "admin",
    "password": "adminpass"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Admin logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```    ✔✔✔

## User Routes
*Note: All user routes require an Authorization header with a valid JWT token.*

### 1. Save Post
- **URL**: `POST http://localhost:3000/users/savePost`
- **Headers**: 
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Body**:
  ```json
  {
    "postId": "12345",
    "postUrl": "https://example.com/post/12345"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Post saved successfully"
  }
  ```    ✔✔✔

### 2. Report Post
- **URL**: `POST http://localhost:3000/users/reportPost`
- **Headers**: 
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Body**:
  ```json
  {
    "postId": "12345",
    "postUrl": "https://example.com/post/12345"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Post reported successfully"
  }
  ```    ✔✔✔

### 3. Daily Login Reward
- **URL**: `POST http://localhost:3000/users/dailyLoginReward`
- **Headers**: 
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Body**: *No body required*
- **Response**:
  ```json
  {
    "message": "Daily login reward claimed",
    "coins": 10
  }
  ```    ✔✔✔

### 4. Share Post Reward
- **URL**: `POST http://localhost:3000/users/sharePostReward`
- **Headers**: 
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Body**: *No body required*
- **Response**:
  ```json
  {
    "message": "Share post reward claimed",
    "coins": 15
  }
  ```    ✔✔✔

### 5. Save Post Reward
- **URL**: `POST http://localhost:3000/users/savePostReward`
- **Headers**: 
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Body**: *No body required*
- **Response**:
  ```json
  {
    "message": "Save post reward claimed",
    "coins": 20
  }
  ```    ✔✔✔

### 6. Complete Profile Reward
- **URL**: `POST http://localhost:3000/users/completeProfileReward`
- **Headers**: 
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "mobile": "1234567890"
  }
  ```
- **Response (First Time)**:
  ```json
  {
    "message": "Profile completed and reward claimed",
    "coins": 120
  }
  ```
- **Response (Already Claimed)**:
  ```json
  {
    "message": "Profile completion reward already claimed",
    "coins": 120
  }
  ```    ✔✔✔

### 7. Get User Profile
- **URL**: `GET http://localhost:3000/users/profile`
- **Headers**: 
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Response**:
  ```json
  {
    "_id": "60d21b4667d0d8992e610c83",
    "username": "testuser",
    "coins": 25,
    "email": "user@example.com",
    "mobile": "1234567890",
    "savedPosts": ["60d21b4667d0d8992e610c84"],
    "reportedPosts": ["60d21b4667d0d8992e610c85"],
    "lastRewardDate": "2023-06-22T18:30:00.000Z"
  }
  ```    ✔✔✔

### 8. Get Saved Posts
- **URL**: `GET http://localhost:3000/users/savedPosts`
- **Headers**: 
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Response**:
  ```json
  [
    {
      "_id": "60d21b4667d0d8992e610c84",
      "postId": "12345",
      "postUrl": "https://example.com/post/12345",
      "source": "reddit",
      "title": "Example Post Title",
      "author": "originalPoster",
      "thumbnail": "https://example.com/thumbnail.jpg",
      "savedAt": "2023-06-22T18:30:00.000Z"
    },
    // More saved posts...
  ]
  ```    ✔✔✔

## Admin Routes
*Note: All admin routes require an Authorization header with a valid admin JWT token.*

### 1. Get All Reports
- **URL**: `GET http://localhost:3000/admin/reports`
- **Headers**: 
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Response**:
  ```json
  [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "reporter": {
        "_id": "60d21b4667d0d8992e610c83",
        "username": "testuser"
      },
      "post": {
        "postId": "12345",
        "postUrl": "https://example.com/post/12345"
      },
      "timestamp": "2023-06-22T18:30:00.000Z"
    }
  ]
  ```    ✔✔✔

### 2. Update User Coins
- **URL**: `PUT http://localhost:3000/admin/updateCoins`
- **Headers**: 
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Body**:
  ```json
  {
    "userId": "681361267e9b62f865acebe4",
    "coins": 100
  }
  ```
- **Response**:
  ```json
  {
    "message": "User coins updated successfully",
    "coins": 100
  }
  ```    ✔✔✔

### 3. Get All Users
- **URL**: `GET http://localhost:3000/admin/users`
- **Headers**: 
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Response**:
  ```json
  [
    {
      "_id": "60d21b4667d0d8992e610c83",
      "username": "testuser",
      "coins": 25,
      "email": "user@example.com",
      "mobile": "1234567890",
      "savedPosts": ["60d21b4667d0d8992e610c84"],
      "reportedPosts": ["60d21b4667d0d8992e610c85"],
      "lastRewardDate": "2023-06-22T18:30:00.000Z"
    },
    // More users...
  ]
  ```

## Posts Routes
*Note: This endpoint doesn't require authentication.*

### 1. Get Combined Feed
- **URL**: `GET http://localhost:3000/posts`
- **Query Parameters**: 
  ```
  limit=10 (optional, defaults to 10)
  ```
- **Response**:
  ```json
  [
    {
      "postId": "abc123",
      "postUrl": "https://reddit.com/r/popular/comments/abc123",
      "title": "Example Reddit Post",
      "author": "redditUser",
      "thumbnail": "https://example.com/thumbnail.jpg",
      "content": "Post content here",
      "source": "reddit"
    },
    {
      "postId": "def456",
      "postUrl": "https://twitter.com/i/web/status/def456",
      "title": "Example Tweet",
      "author": "twitterUser",
      "content": "Tweet content here",
      "source": "twitter"
    }
  ]
  ```

## Error Responses

### Authentication Errors
- **Invalid Credentials**:
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

- **Missing Token**:
  ```json
  {
    "message": "Authentication required"
  }
  ```

- **Invalid Token**:
  ```json
  {
    "message": "Invalid token"
  }
  ```

### Authorization Errors
- **Admin Access Required**:
  ```json
  {
    "message": "Unauthorized: Admin role required"
  }
  ```

- **Invalid Admin Key**:
  ```json
  {
    "message": "Unauthorized: Invalid admin key"
  }
  ```

### Resource Errors
- **User Not Found**:
  ```json
  {
    "message": "User not found"
  }
  ```

- **Post Already Saved**:
  ```json
  {
    "message": "Post already saved"
  }
  ```

### Server Errors
- **Internal Server Error**:
  ```json
  {
    "message": "Error message",
    "error": "Detailed error information"
  }
  ```





