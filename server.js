const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("./config");
const middlewares = require("./middlewares/auth");
const userAuthRoutes = require("./routes/userAuthRoutes");
const userDashboardRoutes = require("./routes/userdashboardRoutes");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

// Connect to MongoDB
mongoose
  .connect(config.dbURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());

// Set EJS as the view engine
app.set("view engine", "ejs");

// Specify the directory where your EJS files are located
app.set("views", __dirname + "/views");

// Specify the static folder
app.use(express.static("public"));

// Define your route to render the index.ejs template
app.get("/", (req, res) => {
  res.render("index");
});

// Auth Routes
// app.use("/auth", userAuthRoutes);

// Custom Middleware
app.use(cookieParser());

// Custom Middleware
app.use(middlewares.auth);

// Routes Dashboard
app.use("/dashboard", userDashboardRoutes);


// Logout
app.use('/logout',(req,res)=>{
  
})

// Event based connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle custom events
  socket.on("chat message", (message) => {
    console.log("Message:", message);
    // Broadcast the message to all connected clients
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
