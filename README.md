# ★ LeLook Project Documentation

## Table of Contents
- [Overview](#overview)
- [Project Setup](#project-setup)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Third-Party Dependencies](#third-party-dependencies)
- [Running and Testing](#running-and-testing)

## Overview
LeLook is a web application that helps users manage their wardrobe digitally. It features AI-powered outfit suggestions, wardrobe organization, and weather-based clothing recommendations.

## Project Setup

### Prerequisites
- Node.js 
- PostgreSQL
- npm or yarn

### Backend Setup
1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file with the following variables:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=lelook
JWT_SECRET=your_jwt_secret
REMOVE_BG_API_KEY=your_remove_bg_api_key
PORT=4000
```
To get a `REMOVE_BG_API_KEY`:
   - Sign up at [remove.bg](https://www.remove.bg/)
   - Navigate to your account settings
   - Generate an API key

5. Initialize the database:
```bash
psql -U your_username -d your_database -f schema.sql
```

### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
REACT_APP_API_URL=http://localhost:4000
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    country_id INTEGER REFERENCES countries(country_id)
);
```

### Countries Table
```sql
CREATE TABLE countries (
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR(100) NOT NULL
);
```

### User Preferences Table
```sql
CREATE TABLE user_preferences (
    preference_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    preferred_style VARCHAR(50) NOT NULL,
    favorite_colors TEXT[] NOT NULL,
    preferred_fit VARCHAR(50) NOT NULL,
    weather_sensitivity BOOLEAN DEFAULT true
);
```

### Clothing Items Table
```sql
CREATE TABLE clothing_items (
    item_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    name VARCHAR(100) NOT NULL,
    category_id INTEGER REFERENCES categories(category_id),
    color VARCHAR(50) NOT NULL,
    season VARCHAR(50) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);
```

### Categories Table
```sql
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);
```

### Outfits Table
```sql
CREATE TABLE outfits (
    outfit_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    name VARCHAR(100) NOT NULL,
    occasion VARCHAR(100) NOT NULL,
    season VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_url VARCHAR(255) NOT NULL
);
```

### Outfit Items Table
```sql
CREATE TABLE outfit_items (
    outfit_item_id SERIAL PRIMARY KEY,
    outfit_id INTEGER REFERENCES outfits(outfit_id),
    item_id INTEGER REFERENCES clothing_items(item_id),
    position JSON,
    scale FLOAT DEFAULT 1,
    position_index INTEGER,
    UNIQUE(outfit_id, item_id)
);
```

### Table Relationships

1. Users & Countries:
   - Each user belongs to one country
   - One country can have many users

2. Users & User Preferences:
   - Each user has one set of preferences
   - One-to-one relationship

3. Users & Clothing Items:
   - Each user can have many clothing items
   - One-to-many relationship

4. Clothing Items & Categories:
   - Each clothing item belongs to one category
   - One category can have many items

5. Users & Outfits:
   - Each user can have many outfits
   - One-to-many relationship

6. Outfits & Clothing Items:
   - Many-to-many relationship through outfit_items table
   - Each outfit can contain multiple clothing items
   - Each clothing item can be part of multiple outfits
   - The outfit_items table stores the position and scale of each item within the outfit

## API Documentation

### Authentication Endpoints

#### POST /users/register
Register a new user
```json
{
  "first_name": "string",
  "email": "string",
  "password_hash": "string",
  "country_name": "string"
}
```

#### POST /users/login
Login user
```json
{
  "email": "string",
  "password_hash": "string"
}
```

### Clothing Items Endpoints

#### POST /clothingitems
Create new clothing item
- Method: POST
- Content-Type: multipart/form-data
```json
{
  "user_id": "number",
  "name": "string",
  "category_name": "string",
  "color": "string",
  "season": "string",
  "image": "file"
}
```

#### GET /clothingitems/user/:user_id
Get all items for a user

#### GET /clothingitems/category/:user_id/:category_name
Get items by category

#### GET /clothingitems/season/:user_id/:season
Get items by season

### User Preferences Endpoints

#### POST /userpref
Create user preferences
```json
{
  "user_id": "number",
  "preferred_style": "string",
  "favorite_colors": "string[]",
  "preferred_fit": "string",
  "weather_sensitivity": "boolean"
}
```

#### GET /userpref/:id
Get user preferences

#### PUT /userpref/:id
Update user preferences

## Third-Party Dependencies

### Backend
- express: Web framework
- sequelize: ORM for PostgreSQL
- jsonwebtoken: Authentication
- bcrypt: Password hashing
- multer: File upload handling
- axios: HTTP client
- cors: Cross-origin resource sharing

### Frontend
- react: UI library
- @mui/material: Material-UI components
- lucide-react: Icons
- axios: HTTP client
- react-router-dom: Routing

## Running and Testing

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

### Testing

#### Manual Testing
1. Create a new account using the signup form
2. Login with your credentials
3. Set up your preferences
4. Add clothing items to your wardrobe
5. Create outfits using the added items

#### API Testing
You can use tools like Postman to test the API endpoints.

### Common Issues and Troubleshooting

1. Database Connection Issues
   - Verify PostgreSQL is running
   - Check database credentials in .env file
   - Ensure database schema is properly initialized

2. Image Upload Issues
   - Check file size (max 5MB)
   - Verify supported formats (JPG, PNG)
   - Ensure proper REMOVE_BG_API_KEY configuration

3. Authentication Issues
   - Clear browser localStorage
   - Verify JWT_SECRET in .env file
   - Check token expiration settings
