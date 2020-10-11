const express = require('express'); //Fast, unopinionated, minimalist web framework for Node.js
const jwt = require('jsonwebtoken'); // JWT for authorization

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welocme to the API'
    });
});

app.listen(5000, () => console.log('Server started on 5000'));