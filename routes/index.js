const express = require('express');

const noteRouter = require('./notes')

const app = express();

app.use('/notes', noteRouter);

module.exports = app;