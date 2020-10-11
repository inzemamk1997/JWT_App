const express = require('express'); //Fast, unopinionated, minimalist web framework for Node.js
const jwt = require('jsonwebtoken'); // JWT for authorization

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welocme to the API'
    });
});


//Route that i want to protect using JWT authorization
app.post('/api/posts', verifyToken,(req, res) => {
    res.json({
        message : 'Post Created ....'
    });
});


//Implement jsonwebtoken.
//Route to generate jsonwebtoken
app.post('api/login', (req, res) => {
        //Mock user(In real application the request will go through a database and we will get our user back)
        //payload 
        const user = {
            id: 1,
            username: 'Inzi',
            email: 'inzirocks@gmail.com'
        }

       jwt.sign({user}, 'secretkey', (err, token) => {
           res.json({
               //We will get our JWT from here
               token
           });
       });
});

//FORMAT OF TOKEN
//Authorization : Bearer <access_token>
//verifyToken
function verifyToken(req,res,next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if (typeof bearerheader !== 'undefined') {
        //Split at the space
    } else {
        //Forbidden
        res.sendStatus(403);
    }
}
app.listen(5000, () => console.log('Server started on 5000'));