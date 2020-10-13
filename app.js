const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const mySecretKey = process.env.JWT_SECRET_KEY;

//console.log(mySecretKey);

app.use(express.json());

function verifyToken(req, res, next) {
    // 'x-auth-token' should be send by the client in the header
    const authToken = req.headers["x-auth-token"];
    // check if 'x-auth-token' is undefined
    if (typeof authToken === "string") {
        // verify the token (check for validity and expiry)
        jwt.verify(authToken, mySecretKey, (err, authData) => {
            if (err) {
                res.status(401).send({
                    message: "Invalid token. Please login again!",
                });
                return;
            }

            // call the next middleware
            next();
        });
    } else {
        // forbidden
        res.status(401).send({
            message: "Invalid token. Please login again!",
        });
        return;
    }
}


// route that i want to protect using JWT authorization
app.get("/api/private", verifyToken, (req, res) => {
    res.json({ message: "Private data!" });
});

//Data that is public
app.get("/api/public", (req, res) => {
    res.json({
        message: "Public data!",
    });
});

// route to generate jsonwebtoken
app.post("/api/login", (req, res) => {
    // mock user (In real application the request will go through a database and we will get our user back)

    const user = req.body.userId;
    const password = req.body.password;

    if (user === "Inzi" && password === "inzi@viasat") {
        const dataToSign = {
            username: "Inzi",
        };
        //JWT token Generator
        jwt.sign(
            { dataToSign },
            mySecretKey,
            { expiresIn: "600s" },
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

const PORT = process.env.PORT;
app.listen(5000, () => console.log(`Server listening on ${PORT}`));