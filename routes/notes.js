const note = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

note.get('/', (req,res) =>
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);











module.exports = note;