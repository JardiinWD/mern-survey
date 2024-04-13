/* ==== PACKAGES IMPORTS ==== */
const express = require('express')
const passport = require('passport') // PASSPORT
const GoogleStrategy = require('passport-google-oauth20').Strategy // GOOGLE STRATEGY
/* ==== FILES IMPORTS ==== */
const keys = require('./config/keys')

/* ==== EXPRESS SETUP ==== */

const app = express()

/* ==== OAUTH SETUP ==== */


/** Middleware for Google Strategy
 * @param {String} accessToken - Google OAuth2 access token
 * @param {String} refreshToken - Google OAuth2 refresh token
 * @param {Object} profile - Google profile data
 * @param {Function} done - Callback function to call when strategy is done
 */
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID, // CLIENT ID FROM GOOGLE DEVELOPER CONSOLE
    clientSecret: keys.googleClientSecret, // CLIENT SECRET FROM GOOGLE DEVELOPER CONSOLE
    callbackURL: "/auth/google/callback" // CALLBACK URL FROM GOOGLE DEVELOPER CONSOLE
}, (accessToken, refreshToken, profile, done) => {
    console.log("Google Strategy called with access token: ", accessToken);
    console.log("Google Strategy called with refresh token: ", refreshToken);
    console.log("Google Strategy called with profile: ", profile);
    console.log("Google Strategy called with done: ", done);
}))


/* ==== ROUTES SETUP ==== */


/** Route for Google Authentication 
 * @api {get} /auth/google Authenticate User with Google
 * @apiName AuthenticateUserWithGoogle
 * @apiGroup Authentication
 * @apiParam {String} scope The scope of authentication, in this case it is 'profile' and 'email'
 */
app.get(
    '/auth/google',
    passport.authenticate('google', {
        // Access to Google profile and email scopes 
        scope: ['profile', 'email']
    })
)


app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {

})


/* ==== SERVER SETUP ==== */

// Define port for server to listen to 
const PORT = process.env.PORT || 5575

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})