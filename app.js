// imports
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// app setup
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home');
});

// start the server
app.listen(3000, () => {
    console.log('Listening on Port: 3000!');
});