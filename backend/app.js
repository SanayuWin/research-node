const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8087;

// Middleware for parsing JSON
app.use(express.json());

// Custom middleware to set headers
app.use((req, res, next) => {
    res.set({
      'Vary': 'Accept-Encoding'
    });
  
    next();
});


// Database connection
const db = require('./config/db');

// Define API routes
const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);
  
app.listen(port, () => {
});
