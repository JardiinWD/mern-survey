/* ==== PACKAGES IMPORTS ==== */
const passport = require('passport'); // PASSPORT

/**
 * Route for Google Authentication 
 * @api {get} /auth/google Authenticate User with Google
 * @apiName AuthenticateUserWithGoogle
 * @apiGroup Authentication
 * @app
 * @apiParam {String} scope The scope of authentication, in this case it is 'profile' and 'email'
 */
module.exports = (app) => {
    // Route for Google Authentication and redirect to callback route
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
    // Route for Google Callback and redirect to callback route with user data
    app.get('/auth/google/callback', passport.authenticate('google'))
    // Route for current user
    app.get('/auth/google/current_user', (req, res) => {
        // Check if user is logged in with Google
        if (!req.user) {
            return res.send({});
        }
        // If user is logged in, send user data
        return res.send(req.user);
    })
    // Route for logout
    app.get('/auth/google/logout', (req, res) => {
        // Logout user from passport session
        req.logout();
        // Send empty response to client
        res.send({});
    })
}

