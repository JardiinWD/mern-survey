/* ==== PACKAGES IMPORT ==== */
const express = require('express')

/* ==== EXPRESS SETUP ==== */
const app = express()

/* ==== ROUTES SETUP ==== */
app.get('/', (req, res) => {
    res.send('Hello World!')
})

/* ==== SERVER SETUP ==== */
app.listen(5000, () => {
    console.log('Server started on port 5000')
})