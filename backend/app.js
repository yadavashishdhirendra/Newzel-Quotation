const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require("path");

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/config.env"
    })
}
// mongodb+srv://invoice:<password>@cluster0.vkre1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb://localhost:27017/Invoice
// FYep0hyvdb9CoJ0l
// using middleware
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload())
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}))
app.use(cookieParser())

// Importing Routes
const invoice = require('./routes/InvoiceRoute');
const user = require('./routes/UserRoute');

// using routes
app.use('/api/v1', invoice);
app.use('/api/v1', user);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})

module.exports = app;