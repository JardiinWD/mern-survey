/* ==== PACKAGES IMPORTS ==== */
const passport = require('passport'); // PASSPORT
const GoogleStrategy = require('passport-google-oauth20').Strategy // GOOGLE STRATEGY
/* ==== FILES IMPORTS ==== */
const User = require('../models/User');
const keys = require('../config/keys');

/* ==== PASSPORT SETUP ==== */

/** Middleware to Serialize user by id
 * @param {Object} user - User model
 * @param {Function} done - Callback function to call when strategy is done
 */
passport.serializeUser((user, done) => {
    // Serialize user by id for session
    done(null, user.id)
})


/** Middleware to Deserialize user by id
 * @param {String} id - User id
 * @param {Function} done - Callback function to call when strategy is done
 * @param {Object} user - User model
 */
passport.deserializeUser((id, done) => {
    // Deserialize user by id for session
    User.findById(id).then((user) => {
        done(null, user)
    })
})


/** Middleware for Google Strategy
 * @param {String} accessToken - Google OAuth2 access token
 * @param {String} refreshToken - Google OAuth2 refresh token
 * @param {Object} profile - Google profile data
 * @param {Function} done - Callback function to call when strategy is done
 * @param {Object} User - User model
 * @param {Object} newUser - New user 
 * @param {Object} existingUser - Existing user 
 */
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID, // CLIENT ID FROM GOOGLE DEVELOPER CONSOLE
    clientSecret: keys.googleClientSecret, // CLIENT SECRET FROM GOOGLE DEVELOPER CONSOLE
    callbackURL: "/auth/google/callback" // CALLBACK URL FROM GOOGLE DEVELOPER CONSOLE
}, (accessToken, refreshToken, profile, done) => {
    // Look at user in database here 
    User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
            // We already have a record with the given profile ID
            done(null, existingUser)
        } else {
            // We don't have a user record with this ID, make a new record
            new User({ googleId: profile.id }).save().then((newUser) => {
                done(null, newUser)
            })
        }
    })
}))
