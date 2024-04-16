/* ==== PACKAGES IMPORTS ==== */
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan');
const cookieSession = require('cookie-session')
const passport = require('passport')
/* ==== FILES IMPORTS ==== */
const keys = require('./config/keys')
/* ==== SERVICES IMPORTS ==== */
require('./services/passport')
require('./models/User')

/* ==== SERVER SETUP ==== */

// Define MongoDB connection string for server to use (see config/keys.js)
const mongoUri = `mongodb+srv://${keys.mongoUsername}:${keys.mongoPassword}@${keys.mongoHost}/${keys.mongoDbName}?retryWrites=true&w=majority`

// Connect to MongoDB database 
try {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,       // Use the new URL parser
        useCreateIndex: true,        // Ensure indexes are created when needed
        useFindAndModify: false,     // Disable 'findOneAndUpdate' and 'findOneAndDelete' to use 'updateOne' and 'deleteOne'
        useUnifiedTopology: true     // Use the new Server Discovery and Monitoring engine
    }).then(() => {
        console.log(`MongoDB database's (${keys.mongoDbName}) is successfully connected`);
    })
} catch (error) {
    console.log(`Unable to connect to ${keys.mongoDbName} database : ${error.message}`);
}

/* ==== EXPRESS SETUP ==== */
const app = express()
app.use(morgan('dev'))

/* ==== MIDDLEWARE SETUP ==== */
app.use(
    cookieSession({
        maxAge: 20 * 24 * 60 * 60 * 1000, // How long the cookie can last (20 days)
        keys: [keys.cookieKey] // Cookie encryption key
    })
)

/* ==== PASSPORT SETUP ==== */
app.use(passport.initialize()) // Initialize passport
app.use(passport.session()) // Serialize and Deserialize passport

/* ==== ROUTES SETUP ==== */
require('./routes/authRoutes')(app)

// Define port for server to listen to 
const PORT = keys.serverPort || 6575

app.listen(PORT, () => {
    console.log(`Server is currently listening on port: ${PORT}`)
})