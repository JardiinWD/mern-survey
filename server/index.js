/* ==== PACKAGES IMPORT ==== */
const express = require('express')

/* ==== EXPRESS SETUP ==== */
const app = express()

/* ==== ROUTES SETUP ==== */
app.get('/', (req, res) => {
    res.send('Hello World!')
})

/* ==== SERVER SETUP ==== */

// Define port for server to listen to 
const PORT = process.env.PORT || 5575

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})