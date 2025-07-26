// Import dependencies
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes.js");
const campaignRoutes = require("./routes/campaigns.routes.js");

// Initialize Express app
const app = express();

// Enable CORS for all routes
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// Middleware for logging (debug logs removed)
app.use((req, res, next) => {
  // This middleware can be used for request logging or preprocessing
  next();
});

// Register user-related routes under /api/user
app.use("/api/user", userRoutes);
// Register campaign-related routes under /api/campaigns
app.use("/api/campaigns", campaignRoutes);

// Export the app for use in Lambda handler
module.exports = app;
