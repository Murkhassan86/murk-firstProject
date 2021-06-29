const express = require('express');
const bodyParser = require('body-parser');
//schema
const mongoose = require('mongoose');
//routes
const signUpRoutes = require('./routes/login');

const path = require('path');


const app = express();

mongoose.connect('mongodb+srv://murk:' + process.env.MONGO_ATLAS_PW + '@cluster0.aqccd.mongodb.net/node-angular').then(() => {
    console.log('database connected successfully');
})
.catch(() => {
    console.log("connection failed");
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
})

app.use("/api/user", signUpRoutes)
module.exports = app;