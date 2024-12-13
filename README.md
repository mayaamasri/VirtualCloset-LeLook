# **LeLook ✨**

## **Project Description**

LeLook is an AI-powered virtual closet management platform that helps users digitize, organize, and create outfits from their wardrobe. The platform features intelligent outfit suggestions based on weather, occasion, and user preferences, with a focus on user experience and personalization. Built with Node.js backend and React frontend, LeLook combines wardrobe management with AI assistance to enhance users' fashion experience.

---

## **Features**

- **Virtual Closet Management**: Digitize and organize clothing items
- **AI-Powered Styling**: Get outfit suggestions based on weather and occasion
- **Image Processing**: Background removal for clean item photos
- **Outfit Creation**: Interactive outfit building interface
- **Weather Integration**: Real-time weather-based recommendations
- **User Preferences**: Personalized style settings and preferences
- **Multi-category Support**: Organize items by type, color, and season
- **Secure Authentication**: JWT-based user authentication

---

## **Backend Routes**

### **Authentication & Users**
| Method | Endpoint           | Description         | Status Codes |
|--------|-------------------|---------------------|--------------|
| POST   | `/users/register` | Register new user   | 201, 400     |
| POST   | `/users/login`    | Sign in user        | 200, 401     |
| GET    | `/users/:id`      | Get user profile    | 200, 404     |
| PUT    | `/users/:id`      | Update user profile | 200, 400     |

### **Clothing Items**
| Method | Endpoint                    | Description             | Status Codes |
|--------|----------------------------|-------------------------|--------------|
| POST   | `/clothingitems`           | Add new item           | 201, 400     |
| GET    | `/clothingitems/user/:id`  | Get user's items       | 200, 404     |
| PUT    | `/clothingitems/:id`       | Update item           | 200, 400     |
| DELETE | `/clothingitems/:id`       | Delete item           | 200, 404     |

### **Outfits**
| Method | Endpoint                   | Description            | Status Codes |
|--------|---------------------------|------------------------|--------------|
| POST   | `/outfits`                | Create new outfit      | 201, 400     |
| GET    | `/outfits/user/:id`       | Get user's outfits     | 200, 404     |
| PUT    | `/outfits/:id`            | Update outfit         | 200, 400     |
| DELETE | `/outfits/:id`            | Delete outfit         | 200, 404     |

### **AI Services**
| Method | Endpoint               | Description                  | Status Codes |
|--------|-----------------------|------------------------------|--------------|
| POST   | `/ai/suggest-outfit`  | Get AI outfit suggestion     | 200, 400     |
| POST   | `/ai/analyze-image`   | Analyze clothing image       | 200, 400     |

---

## **Database Diagram**

### **PostgreSQL Tables**
1. **Users**: User account information
    - **Columns**: `user_id`, `first_name`, `username`, `email`, `password_hash`, `country_id`

2. **Countries**: Country information
    - **Columns**: `country_id`, `country_name`

3. **Categories**: Clothing categories
    - **Columns**: `category_id`, `category_name`

4. **ClothingItems**: User's clothing items
    - **Columns**: `item_id`, `user_id`, `category_id`, `name`, `color`, `season`, `image_url`

5. **Outfits**: User-created outfits
    - **Columns**: `outfit_id`, `user_id`, `name`, `occasion`, `season`, `image_url`, `created_at`

6. **OutfitItems**: Items in outfits
    - **Columns**: `outfit_item_id`, `outfit_id`, `item_id`, `position`, `scale`, `position_index`

7. **UserPreferences**: User style preferences
    - **Columns**: `preference_id`, `user_id`, `preferred_style`, `favorite_colors`, `preferred_fit`, `weather_sensitivity`

---

## **Libraries Used**

### **Frontend**
- **React.js**: UI framework
- **Material-UI**: Component library
- **React DnD**: Drag and drop functionality
- **Axios**: HTTP client
- **React Router DOM**: Navigation
- **Lucide React**: Icons
- **HTML2Canvas**: Canvas capture

### **Backend**
- **Express.js**: Web framework
- **Sequelize**: PostgreSQL ORM
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **Multer**: File upload handling
- **OpenAI API**: AI assistance
- **Remove.bg API**: Background removal

---

## **How to Start**

Follow these steps to set up and run the project:

### **Backend Setup**
1. Navigate to backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Set up environment variables:
   ```bash
   # Create .env file with:
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_key
   REMOVE_BG_API_KEY=your_removebg_key
   ```

3. Start the server:
   ```bash
   npm start
   ```

### **Frontend Setup**
1. Navigate to frontend directory:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

Access the application at `http://localhost:3000`

---

## **Use Case Scenario**

### **Scenario: Creating an AI-Suggested Outfit**

1. **Actor**: User
2. **Preconditions**: 
   - User is registered and logged in
   - User has uploaded clothing items
   - User has set style preferences
3. **Steps**:
   1. User navigates to AI suggestion page
   2. Selects weather condition and occasion
   3. System generates outfit suggestions based on:
      - Available clothing items
      - Weather conditions
      - User preferences
      - Occasion requirements
   4. User can:
      - View suggested outfit
      - Modify items if needed
      - Save outfit
4. **Postconditions**:
   - New outfit is saved
   - Outfit is accessible in user's collection

---

## **System Architecture**

```plaintext
  +-------------------+
  |                   |
  |       User        |
  |                   |
  +--------+----------+
           |
           | 1. Request
           v
  +--------+----------+
  |                   |
  |  Authentication   |
  |                   |
  +--------+----------+
           |
           | 2. Validate & Route
           v
  +--------+----------+
  |                   |
  |   Core Services   |
  | - Wardrobe Mgmt   |
  | - Outfit Creation |
  | - AI Suggestions  |
  +--------+----------+
           |
           | 3. Process
           v
  +--------+----------+
  |                   |
  | External Services |
  | - OpenAI API      |
  | - Remove.bg API   |
  | - Weather API     |
  +--------+----------+
           |
           | 4. Store/Retrieve
           v
  +--------+----------+
  |                   |
  |    Database       |
  |                   |
  +-------------------+
```
