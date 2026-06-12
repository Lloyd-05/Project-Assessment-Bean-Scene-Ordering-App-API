const jwt = require('jsonwebtoken');
const Session = require("../models/Session");

const auth = async (req, res, next) => {
  // 1. Get the token from the header
  // Standard format: "Authorization: Bearer <token>"
// const authHeader = req.headers.authorization;
const authHeader = req.headers.authorization;

  // const authHeader = req.headers['authorization'] || req.get['Authorization']; // Handle case-insensitive header name

  // 2. Check if the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. Extract the actual token string (remove "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // 4. Verify the token using our Secret Key from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Check if the session exists in the database (not expired or deleted)
    const session = await Session.findOne({ token: token });

    if (!session) {
      return res.status(401).json({ message: 'Session not found or expired, please log in again' });
    }

    // 6. Attach the user data (id and role) to the request object
    // Now every route that uses this middleware can access 'req.user'
    req.user = decoded;

    // 7. Let the request continue to the route!
    next();
  } catch (err) {
    // If the token is expired or fake, jwt.verify throws an error
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;