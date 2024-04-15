/* ==== PACKAGES IMPORTS ==== */
const mongoose = require('mongoose');

/* ==== USER SCHEMA ==== */
const userSchema = new mongoose.Schema({
    googleId: String, // Google ID
});

/* ==== USER MODEL ==== */
module.exports = mongoose.model('User', userSchema)