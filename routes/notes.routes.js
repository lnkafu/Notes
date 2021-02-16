

module.exports = app => {
    const notes = require('../controller/notes.controller')
    
    //Creating a new note
    app.post('/notes', notes.create)
    
    //Retrieving all notes
    app.get('/notes', notes.findAll)

    //Retrieving a single note
    app.get('/notes/:noteId', notes.findOne)

    //Update a note
    app.put('/notes/:noteId',notes.update)

    //Delete a note
    app.delete('/notes/:noteId', notes.delete)
}
