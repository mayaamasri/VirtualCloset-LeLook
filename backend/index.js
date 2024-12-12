// Initiate the server and connect to the database
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const handleUploadError = require("./Middleware/errorMiddleware");

// Importing the routes
const countryRoutes = require("./Routes/CountryRoutes");
const userRoutes = require("./Routes/UsersRoutes");
const userPrefRoutes = require("./Routes/UserPrefRoutes");
const clothingItemsRoutes = require("./Routes/ClothingItemsRoutes");
const outfitsRoutes = require("./Routes/OutfitsRoutes");
const outfitsItemsRoutes = require("./Routes/OutfitsItemsRoutes");
const categoriesRoutes = require("./Routes/CategoriesRoutes");
const aiRoutes = require("./Routes/aiRoutes");

dotenv.config();

const app = express();

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Existing middleware
app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(handleUploadError);

// Routes
app.use("/countries", countryRoutes);
app.use("/users", userRoutes);
app.use("/userpref", userPrefRoutes);
app.use("/clothingitems", clothingItemsRoutes);
app.use("/outfits", outfitsRoutes);
app.use("/outfitItems", outfitsItemsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/ai", aiRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("api working");
});

const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`====================================`);
  console.log(`Server running on port ${PORT}`);
  console.log(`====================================`);
});
