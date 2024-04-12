const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("./config");
const middlewares = require("./middlewares/auth");
const userAuthRoutes = require("./routes/userAuthRoutes");
const userDashboardRoutes = require("./routes/userdashboardRoutes");
const path = require("path");

// Connect to MongoDB
mongoose
  .connect(config.dbURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

//Middleware
app.use(express.json());

// Set EJS as the view engine
app.set("view engine", "ejs");

// Specify the directory where your EJS files are located
app.set("views", __dirname + "/views");

app.use(express.static("public"));



// Define your route to render the index.ejs template
app.get("/", (req, res) => {
  res.render("index");
});



// Auth Routes
app.use("/auth", userAuthRoutes);


app.use(cookieParser());

// Custom middlewares
app.use(middlewares.auth);

app.use("/dashboard", userDashboardRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
