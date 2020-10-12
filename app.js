const express = require("express"); //Fast, unopinionated, minimalist web framework for Node.js
const jwt = require("jsonwebtoken"); // JWT for authorization

const app = express();
const mySecretKey = "I am a secret. Don't share me at all!";

app.use(express.json());

//FORMAT OF TOKEN
//Authorization : Bearer <access_token>
//verifyToken
function verifyToken(req, res, next) {
    //Get auth header value
    // 'x-auth-token' should be send by the client in the header
    const authToken = req.headers["x-auth-token"];
    //Check if bearer is undefined
    if (typeof authToken === "string") {
        req.token = authToken;
        //Next middleware
        next();
    } else {
        //Forbidden
        res.status(401).send({
            message: "Invalid token. Please login again!",
        });
        return;
    }
}

app.get("/api", (req, res) => {
    res.json({
        message: "Welocme to the API",
    });
});

//Route that i want to protect using JWT authorization(DATA that is private)
app.get("/api/private", verifyToken, (req, res) => {
    jwt.verify(req.token, mySecretKey, (err, authData) => {
        if (err) {
            res.status(401).send({
                message: "Invalid token. Please login again!",
            });
        } else {
            res.json({
                message: "Private data!",
            });
        }
    });
});

//Data that is public that donot need any authorization
app.get("/api/public", (req, res) => {
    res.json({
        message: "Public data!",
    });
});

//Implement jsonwebtoken.
//Route to generate jsonwebtoken
app.post("/api/login", (req, res) => {
    //Mock user(In real application the request will go through a database and we will get our user back)
    //payload

    const user = req.body.userId;
    const password = req.body.password;

    if (user === "Inzi" && password === "inzi@viasat") {
        const dataToSign = {
            username: "Inzi",
        };
        //JWT generated after Login Authentication
        //JWT token generated using userId and secret Key
        jwt.sign(
            { dataToSign },
            mySecretKey,
            { expiresIn: "240s" },
            (err, token) => {
                res.setHeader("x-auth-token", token);
                res.json({
                    message: "Successfully logged in!",
                });
            }
        );
    } else {
        // not a valid credentials
        res.status(400).json({
            message: "Please check your userId and password",
        });
    }
});

app.listen(5000, () => console.log("Server listening on 5000"));