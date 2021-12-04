const express = require("express");
const app = express();

const output = require("./user_data.json")
app.get('/', function (req, res) {
    res.end('Welcome to Index page');
});

app.get('/user_data', function (req, res) {
    res.send(output);
});

app.listen(8000, function () {
    console.log("listening on port 8000");
});