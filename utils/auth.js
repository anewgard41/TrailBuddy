// Middleware function to check if the user is authenticated (logged in)
const withAuth = (req, res, next) => {
  // Check if the user is not logged in
  if (!req.session.logged_in) {
    // If not logged in, redirect the request to the login route
    res.redirect('/login');
  } else {
    // If logged in, continue to the next middleware or route handler
    next();
  }
};

// Export the middleware function for use in routes or other parts of the application
module.exports = withAuth;