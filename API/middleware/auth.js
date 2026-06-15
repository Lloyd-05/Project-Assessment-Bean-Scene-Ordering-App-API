const jwt = require('jsonwebtoken');
const Session = require("../models/Session");

const auth = async (req, res, next) => {   // Get the token from the header

const authHeader = req.headers.authorization; // Standard format: "Authorization: Bearer <token>"

  if (!authHeader || !authHeader.startsWith('Bearer ')) {   // Check if the header exists and starts with "Bearer "
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];   // Extract the actual token string (remove "Bearer ")

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);     // Verify the token using our Secret Key from .env

    const session = await Session.findOne({ token: token });     // Check if the session exists in the database (not expired or deleted)

    if (!session) { // If no session is found, it means the token is either expired or invalid
      return res.status(401).json({ message: 'Session not found or expired, please log in again' });
    }

    /*Attach the user data (id and role) to the request object
    // Now every route that uses this middleware can access 'req.user' */
    req.user = decoded;

    // 7. Let the request continue to the route!
    next();
  } catch (err) {
    // If the token is expired or fake, jwt.verify throws an error
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;