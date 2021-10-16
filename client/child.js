//dotenv is used to read global variables from .env files
const dotenv = require('dotenv');
const axios = require('axios')

dotenv.config();

const args = process.argv.slice(2)
const childName = args[0]
const pollInterval = args[1]

setInterval(() => {
    axios
        .post(process.env.SERVER_HOST + ':' + process.env.SERVER_PORT + '/api/v1/greet', {
            message: 'Greeting from ' + childName
        })
        .then(res => {
            console.log(`statusCode: ${res.status}`)
        })
        .catch(error => {
            console.error("error", error.response)
        })
}, pollInterval * 1000);