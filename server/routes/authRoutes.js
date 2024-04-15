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
}

