// Middleware function to check if user is logged in

const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the user to the login page
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};
