const jwt = require("jsonwebtoken");




exports.auth = async (req, res, next) => {
  try {
  
    const token = req.cookies.jwt;
    

    // Verify the JWT synchronously
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(401).send("Unauthorized");
  }
};
