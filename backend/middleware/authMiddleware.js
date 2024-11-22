// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Middleware function to verify the JWT token
const verifyToken = (req, res, next) => {
   // Retrieve the token from the request headers
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];
   if (!token) {
      // If there's no token, return an error
      return res.status(401).json({ message: "Access denied. No token provided." });
   }
   
   try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, "RANDOM");
   
      // Add the decoded token data to the request object
      req.user = decoded;
      next(); // Proceed to the next middleware/route handler
   } catch (error) {
      console.log(error);
      // If the token is invalid or expired, return an error
      return res.status(403).json({ message: "Invalid or expired token." });
   }
};

module.exports = verifyToken;
