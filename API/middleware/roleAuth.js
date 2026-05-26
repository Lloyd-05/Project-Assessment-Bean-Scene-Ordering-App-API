module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: You do not have permission" });
    }
    next();
  };
};

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Check if req.user exists (Stage 3 must run first!)
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // 2. Check if the user's role is in the list of allowed roles
    // Example: if allowedRoles is ['manager'] and req.user.role is 'staff' -> Fail
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied: ${req.user.role}s cannot perform this action.`
      });
    }

    // 3. Success! Move to the next function
    next();
  };
};

module.exports = authorizeRole;