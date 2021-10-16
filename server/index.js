//dotenv is used to read global variables from .env files
const dotenv = require('dotenv');
const express = require("express");

dotenv.config();
const app = express()

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post("/api/v1/greet", (req, res, next) => {
    const clientIP = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress;
    const clientPort = req.socket.remotePort;

    //print client's message
    console.log(req.body.message + " via", clientIP + ":" + clientPort);
    res.send({ status: true })
})

const PORT = process.env.SERVER_PORT;

// send default message if api route is not found.
app.use((res) => {
    res.status(404).json({
        message: 'Api not found.'
    })
})

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})