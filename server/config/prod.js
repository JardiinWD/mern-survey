const dotenv = require('dotenv'); // DOTENV
dotenv.config({ path: './config.env' })

const {
    PROD_SERVER_PORT,
    PROD_MONGO_DB_USERNAME,
    PROD_MONGO_DB_PASSWORD,
    PROD_MONGO_DB_CLUSTER,
    PROD_MONGO_DB_DATABASE,
    PROD_GOOGLE_CLIENT_ID,
    PROD_GOOGLE_CLIENT_SECRET,
    PROD_GOOGLE_CLIENT_COOKIE_KEY
} = process.env

module.exports = {
    googleClientID: PROD_GOOGLE_CLIENT_ID,
    googleClientSecret: PROD_GOOGLE_CLIENT_SECRET,
    mongoUsername: PROD_MONGO_DB_USERNAME,
    mongoPassword: PROD_MONGO_DB_PASSWORD,
    mongoHost: PROD_MONGO_DB_CLUSTER,
    mongoDbName: PROD_MONGO_DB_DATABASE,
    serverPort: PROD_SERVER_PORT,
    cookieKey: PROD_GOOGLE_CLIENT_COOKIE_KEY
}
