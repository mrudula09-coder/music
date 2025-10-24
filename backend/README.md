# Music App - Backend Setup Instructions

## Prerequisites
1. **Node.js** (v16 or higher)
2. **MongoDB** (Local installation or MongoDB Atlas)

## Setup Steps

### 1. Install MongoDB (if not installed)
**Option A: Local MongoDB Installation**
- Download from: https://www.mongodb.com/try/download/community
- Follow installation instructions for Windows

**Option B: MongoDB Atlas (Cloud)**
- Create account at: https://cloud.mongodb.com
- Create a free cluster
- Get connection string

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies (already done)
npm install

# Start MongoDB (if using local installation)
mongod

# Start backend server
npm start
```

### 3. Frontend Setup
```bash
# In a new terminal, navigate to main directory
cd ..

# Start frontend server (already running on port 3000)
npm start
```

## Environment Variables
Update the `.env` file in the backend directory:

```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/musicapp

# For MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/musicapp

JWT_SECRET=your-super-secure-jwt-secret-key-here
PORT=5000
```

## API Endpoints
- **POST** `/api/signup` - Create new user account
- **POST** `/api/login` - User authentication
- **GET** `/api/profile` - Get user profile (protected)
- **GET** `/api/health` - Health check

## Default Ports
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017

## Features Implemented
✅ User registration with email validation  
✅ Secure password hashing with bcrypt  
✅ JWT authentication  
✅ MongoDB integration  
✅ Proper signup → signin flow  
✅ Error handling and validation  
✅ Success/Error messages  

## User Flow
1. User fills signup form (Email, Username, Password, Confirm Password)
2. Data validated and stored in MongoDB
3. Success message shown, automatically redirected to sign-in
4. User signs in with username/password
5. JWT token generated and stored
6. Dashboard loads with authenticated user