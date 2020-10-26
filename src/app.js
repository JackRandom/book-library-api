const express = require('express');
const readerRouter = require('./routes/reader');
const bookRouter = require('./routes/book');

const app = express();

app.use(express.json());
require('dotenv').config() // i added this without prompting not sure its right yet 24/10/2020

app.use('/readers', readerRouter);
app.use('/books', bookRouter);

module.exports = app;
