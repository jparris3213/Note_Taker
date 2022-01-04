const note = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

note.get('/', (req,res) =>
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

note.post('/', (req, res) => {
    const { title, text } = req.body;

    if ( title && text ) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);
    } else {
        res.json('Did Not Post-It...The Note');
    }
});

note.delete('/:id', (req, res) => {
    //create const for ID parameter
    const noteID = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            //create new Array for JSON file without the note tied to noteID
            const newArray = json.filter((note) => note.id !== noteID);

            //write array to file
            writeToFile('./db/db.json', newArray);

            //Message back as result
            res.json(`Note has been deleted with id ${noteID}`);
        });
});








module.exports = note;